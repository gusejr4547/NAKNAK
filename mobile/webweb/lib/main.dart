import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:flutter/services.dart';
import 'package:geolocator/geolocator.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import "package:http/http.dart" as http;



// GeolocationPermissionShowPromptResponse 클래스 정의
class GeolocationPermissionShowPromptResponse {
  final String origin;
  final bool allow;
  final bool retain;

  GeolocationPermissionShowPromptResponse({
    required this.origin,
    required this.allow,
    required this.retain,
  });
}


Future main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Future.delayed(const Duration(seconds: 3)); // 3초 지연
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
  // await SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
  // SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
  //   statusBarColor: Colors.transparent, // 상단바를 투명하게 만듭니다
  // ));

  await Permission.microphone.request();
  await [Permission.camera,Permission.storage].request();
  await Permission.location.request(); // 요청된 위치 권한
  // await Permission.storage.request(); // 파일 접근 권한
  // await Permission.locationWhenInUse.request();
  // await Permission.locationAlways.request();
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => new _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late double latitude = 0.0;
  late double longitude = 0.0;
  // late InAppWebViewController _webViewController;

  @override
  void initState() {
    super.initState();
    _initializeApp();
  }

  // 앱 초기화 함수
  Future<void> _initializeApp() async {
    await _checkLocationPermission();
    await _checkStoragePermission();
    await _getCurrentLocation();
    // await _get('https://otakubot.store:20101/api/books/1');
    // await _post('https://otakubot.store:20101/api/login', {'email':'csi@csi.com', 'password':'csi123'});
  }

  // 위치 권한 확인 함수
  Future<void> _checkLocationPermission() async {
    PermissionStatus status = await Permission.location.status;
    if (!status.isGranted) {
      await Permission.location.request();
    }
  }
  Future<void> _checkStoragePermission() async {
    PermissionStatus status = await Permission.storage.status;
    if (!status.isGranted) {
      await Permission.storage.request();
    }
  }

  // 위치 정보 가져오는 함수
  Future<Map<String, double>> _getCurrentLocation() async {
    try {
      Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );
      setState(() {
        latitude = position.latitude;
        longitude = position.longitude;
      });
      // double latitude = position.latitude;
      // double longitude = position.longitude;
      print({'latitude': latitude, 'longitude': longitude});

      return {'latitude': latitude, 'longitude': longitude};
    } catch (e) {
      print("Error getting location: $e");
      // 에러가 발생한 경우도 Future로 반환해야 합니다.
      throw e;
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false, // 디버그 배너 삭제
      home: InAppWebViewPage(),
    );
  }
}

class InAppWebViewPage extends StatefulWidget {
  @override
  _InAppWebViewPageState createState() => new _InAppWebViewPageState();
}


class _InAppWebViewPageState extends State<InAppWebViewPage> {
  late InAppWebViewController _webViewController;
  // late double latitude = 0.0;
  // late double longitude = 0.0;


  // 위치 정보 가져오는 함수
  Future<Map<String, double>> _getCurrentLocation() async {
    try {
      Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );

      double latitude = position.latitude;
      double longitude = position.longitude;

      return {'latitude': latitude, 'longitude': longitude};
    } catch (e) {
      print("Error getting location: $e");
      // 에러가 발생한 경우도 Future로 반환해야 합니다.
      throw e;
    }
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   title: Text("NakNak"),
      // ),
      body: Container(
        child: Column(
          children: <Widget>[
            Expanded(
              child: Container(
                child: InAppWebView(
                  initialUrlRequest: URLRequest(
                    // url: Uri.parse("https://otakubot.store:20101"),
                    url: Uri.parse("https://i9e105.p.ssafy.io"),
                  ),
                  initialOptions: InAppWebViewGroupOptions(
                    crossPlatform: InAppWebViewOptions(
                      mediaPlaybackRequiresUserGesture: false,
                      javaScriptEnabled: true,
                      allowFileAccessFromFileURLs : true,
                      allowUniversalAccessFromFileURLs:true,

                    ),
                    android: AndroidInAppWebViewOptions(
                      allowContentAccess: true,
                      allowFileAccess: true,
                      databaseEnabled : true,
                      geolocationEnabled: true, // Android에서 geolocation 허용
                    ),
                  ),
                  onWebViewCreated: (controller) {
                    _webViewController = controller;
                    _webViewController.addJavaScriptHandler(
                      handlerName: 'flutterFunction', // Handler name to be used in JavaScript
                      callback: (args) async {
                        // This function will be called when JavaScript code calls the handler
                        print('Received from JavaScript: $args');
                        Map<String, double> loaction = await _getCurrentLocation();
                        return {'latitude': loaction['latitude'], 'longitude': loaction['longitude']};
                      },
                    );
                  },
                  androidOnPermissionRequest:
                      (InAppWebViewController controller, String origin, List<String> resources) async {
                    return PermissionRequestResponse(
                      resources: resources,
                      action: PermissionRequestResponseAction.GRANT,
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

