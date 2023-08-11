import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:flutter/services.dart';
import 'package:geolocator/geolocator.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => new _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late double latitude = 0.0;
  late double longitude = 0.0;
  late InAppWebViewController _webViewController;

  @override
  void initState() {
    super.initState();
    _initializeApp();
  }

  Future<void> _initializeApp() async {
    await Permission.microphone.request();
    await Permission.camera.request();
    await Permission.location.request();
    await _checkLocationPermission();
    await _getCurrentLocation();
  }

  Future<void> _checkLocationPermission() async {
    PermissionStatus status = await Permission.location.status;
    if (!status.isGranted) {
      await Permission.location.request();
    }
  }

  Future<void> _getCurrentLocation() async {
    try {
      Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );

      setState(() {
        latitude = position.latitude;
        longitude = position.longitude;
      });

      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setDouble('latitude', latitude);
      prefs.setDouble('longitude', longitude);

      _webViewController.evaluateJavascript(
        source: "updateLocation('$latitude', '$longitude');",
      );
    } catch (e) {
      print("Error getting location: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: InAppWebViewPage(
        onWebViewCreated: (controller) {
          _webViewController = controller;
        },
      ),
    );
  }
}

class InAppWebViewPage extends StatefulWidget {
  final Function(InAppWebViewController) onWebViewCreated;

  InAppWebViewPage({required this.onWebViewCreated});

  @override
  _InAppWebViewPageState createState() => new _InAppWebViewPageState();
}

class _InAppWebViewPageState extends State<InAppWebViewPage> {
  late InAppWebViewController _webViewController;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Column(
          children: <Widget>[
            Expanded(
              child: Container(
                child: InAppWebView(
                  initialUrlRequest: URLRequest(
                    url: Uri.parse("https://i9e105.p.ssafy.io"),
                  ),
                  initialOptions: InAppWebViewGroupOptions(
                    crossPlatform: InAppWebViewOptions(
                      mediaPlaybackRequiresUserGesture: false,
                    ),
                  ),
                  onWebViewCreated: (InAppWebViewController controller) {
                    _webViewController = controller;
                    widget.onWebViewCreated(_webViewController);
                  },
                  androidOnPermissionRequest: (InAppWebViewController controller, String origin, List<String> resources) async {
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


// ===================================================

// import 'dart:async';
// import 'package:flutter/material.dart';
// import 'package:flutter_inappwebview/flutter_inappwebview.dart';
// import 'package:permission_handler/permission_handler.dart';
// import 'package:flutter/services.dart';
// import 'package:geolocator/geolocator.dart';
// import 'package:shared_preferences/shared_preferences.dart';
//
// Future main() async {
//   SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
//   SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
//     statusBarColor: Colors.transparent, // 상단바를 투명하게 만듭니다
//   ));
//   WidgetsFlutterBinding.ensureInitialized();
//
//
//   await Permission.microphone.request();
//   await Permission.camera.request();
//   await Permission.location.request(); // 요청된 위치 권한
//
//   runApp(MyApp());
// }
//
// class MyApp extends StatefulWidget {
//   @override
//   _MyAppState createState() => new _MyAppState();
// }
//
// class _MyAppState extends State<MyApp> {
//   late double latitude = 0.0;
//   late double longitude = 0.0;
//   late InAppWebViewController _webViewController;
//
//   @override
//   void initState() {
//     super.initState();
//     _initializeApp();
//   }
//
//   // 앱 초기화 함수
//   Future<void> _initializeApp() async {
//     await _checkLocationPermission();
//     await _getCurrentLocation();
//   }
//
//   // 위치 권한 확인 함수
//   Future<void> _checkLocationPermission() async {
//     PermissionStatus status = await Permission.location.status;
//     if (!status.isGranted) {
//       await Permission.location.request();
//     }
//   }
//
//   // 위치 정보 가져오는 함수
//   Future<void> _getCurrentLocation() async {
//     try {
//       Position position = await Geolocator.getCurrentPosition(
//         desiredAccuracy: LocationAccuracy.high,
//       );
//       setState(() {
//         latitude = position.latitude;
//         longitude = position.longitude;
//       });
//       // 현재 위치 정보 저장
//       SharedPreferences prefs = await SharedPreferences.getInstance();
//       print(position.latitude);
//       print(position.longitude);
//       prefs.setDouble('latitude', position.latitude);
//       prefs.setDouble('longitude', position.longitude);
//
//       _webViewController.evaluateJavascript(
//         source: "updateLocation('$latitude', '$longitude');",
//       );
//
//     } catch (e) {
//       print("Error getting location: $e");
//     }
//   }
//
//
//
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       debugShowCheckedModeBanner: false, // 디버그 배너 삭제
//       home: InAppWebViewPage(),
//     );
//   }
// }
//
// class InAppWebViewPage extends StatefulWidget {
//   @override
//   _InAppWebViewPageState createState() => new _InAppWebViewPageState();
// }
//
// class _InAppWebViewPageState extends State<InAppWebViewPage> {
//   late InAppWebViewController _webViewController;
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       // appBar: AppBar(
//       //   title: Text("NakNak"),
//       // ),
//       body: Container(
//         child: Column(
//           children: <Widget>[
//             Expanded(
//               child: Container(
//                 child: InAppWebView(
//                   initialUrlRequest: URLRequest(
//                     // url: Uri.parse("https://otakubot.store:20101"),
//                     url: Uri.parse("https://i9e105.p.ssafy.io"),
//                   ),
//                   initialOptions: InAppWebViewGroupOptions(
//                     crossPlatform: InAppWebViewOptions(
//                       mediaPlaybackRequiresUserGesture: false,
//                     ),
//                   ),
//                   onWebViewCreated: (InAppWebViewController controller) {
//                     _webViewController = controller;
//                   },
//                   androidOnPermissionRequest:
//                       (InAppWebViewController controller, String origin, List<String> resources) async {
//                     return PermissionRequestResponse(
//                       resources: resources,
//                       action: PermissionRequestResponseAction.GRANT,
//                     );
//                   },
//                 ),
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }
//

// --------------------------------------------------------------------------------


// void getLocation() async {
//   bool isLocationServiceEnabled = await Geolocator.isLocationServiceEnabled();
//   if (!isLocationServiceEnabled) {
//     showLocationServiceAlertDialog(); // 위치 서비스가 꺼져있을 때 대화 상자를 표시
//     return;
//   }
//
//   PermissionStatus permissionStatus = await Permission.location.request();
//   if (permissionStatus.isGranted) {
//     try {
//       Position position = await Geolocator.getCurrentPosition(
//         desiredAccuracy: LocationAccuracy.high,
//       );
//       setState(() {
//         currentPosition = position;
//       });
//       final prefs = await SharedPreferences.getInstance();
//       prefs.setDouble('latitude', currentPosition!.latitude);
//       prefs.setDouble('longitude', currentPosition!.longitude);
//       // sendLocationDataToServer(currentPosition!.latitude, currentPosition!.longitude);
//       print("Current Position: $currentPosition");
//     } catch (e) {
//       print("Error getting location: $e");
//     }
//   } else if (permissionStatus.isDenied || permissionStatus.isPermanentlyDenied) {
//     // 위치 권한이 필요한 이유에 대해 사용자에게 대화 상자나 스낵바를 통해 설명합니다.
//   }
//
//
//
// // 위치 서비스가 꺼져있을 때 대화 상자를 표시하는 함수
// void showLocationServiceAlertDialog() {
//   showDialog(
//     context: context,
//     builder: (context) {
//       return AlertDialog(
//         title: Text('위치 서비스가 꺼져있습니다.'),
//         content: Text('위치 정보를 사용하려면 위치 서비스를 켜주세요.'),
//         actions: [
//           TextButton(
//             onPressed: () {
//               Navigator.of(context).pop();
//             },
//             child: Text('취소'),
//           ),
//           TextButton(
//             onPressed: () {
//               openAppSettings(); // 앱 설정으로 이동하여 위치 서비스를 켤 수 있도록 유도
//               Navigator.of(context).pop();
//             },
//             child: Text('설정 열기'),
//           ),
//         ],
//       );
//     },
//   );
// }
//



// // import 'package:flutter/material.dart';
// // import 'package:webview_flutter/webview_flutter.dart';
// // import 'package:permission_handler/permission_handler.dart';
//
// // void main() async {
// //   WidgetsFlutterBinding.ensureInitialized(); // Flutter 앱 초기화
// //   await Permission.camera.request();
// //   runApp(MyApp());
// // }
// //
// // class MyApp extends StatelessWidget {
// //   @override
// //   Widget build(BuildContext context) {
// //     return MaterialApp(
// //       title: 'WebView Example',
// //       home: WebViewApp(),
// //     );
// //   }
// // }
// //
// // class WebViewApp extends StatefulWidget {
// //   @override
// //   _WebViewAppState createState() => _WebViewAppState();
// // }
// //
// // class _WebViewAppState extends State<WebViewApp> {
// //   late WebViewController _webViewController;
// //
// //   @override
// //   Widget build(BuildContext context) {
// //     return Scaffold(
// //       appBar: AppBar(
// //         title: Text('WebView Example'),
// //       ),
// //       body: WebView(
// //         initialUrl: 'https://i9e105.p.ssafy.io', // 리액트 웹 앱 URL로 변경
// //         javascriptMode: JavascriptMode.unrestricted,
// //         onWebViewCreated: (WebViewController webViewController) {
// //           _webViewController = webViewController;
// //         },
// //       ),
// //       floatingActionButton: FloatingActionButton(
// //         onPressed: () {
// //           // 웹뷰 컨트롤러를 사용하여 웹뷰 내의 JavaScript 함수 호출
// //           _webViewController.evaluateJavascript('''
// //             (async function() {
// //               try {
// //                 await navigator.mediaDevices.getUserMedia({ video: true });
// //               } catch (error) {
// //                 console.error('카메라 접근 오류:', error);
// //               }
// //             })();
// //           ''');
// //         },
// //         child: Icon(Icons.camera),
// //       ),
// //     );
// //   }
// // }
//
//
// import 'package:flutter/material.dart';
// import 'package:webview_flutter/webview_flutter.dart';
// import 'package:permission_handler/permission_handler.dart';
//
//
//
// void main() async {
//   WidgetsFlutterBinding.ensureInitialized(); // Flutter 앱 초기화
//   await Permission.camera.request();
//   runApp(MyApp());
// }
//
// class MyApp extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'WebView Example',
//       home: WebViewApp(),
//     );
//   }
// }
//
//
// class WebViewApp extends StatefulWidget {
//   const WebViewApp({super.key});
//   @override
//   State<WebViewApp> createState() => _WebViewAppState();
// }
//
// class _WebViewAppState extends State<WebViewApp> {
//   late final WebViewController controller;
//
//   @override
//   void initState() {
//     super.initState();
//     controller = WebViewController()
//       ..setJavaScriptMode(JavaScriptMode.unrestricted)
//       ..loadRequest(
//         Uri.parse('https://i9e105.p.ssafy.io'),
//       );
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('Flutter WebView'),
//       ),
//       body: WebViewWidget(
//         controller: controller,
//       ),
//     );
//   }
// }
//
//
//
// Future<bool> _getStatuses() async {
//   Map<Permission, PermissionStatus> statuses =
//   await [Permission.storage, Permission.camera].request();
//
//   if (await Permission.camera.isGranted && await Permission.storage.isGranted) {
//     return Future.value(true);
//   } else {
//     return Future.value(false);
//   }
// }
//
//
// // @Override
// // public void onPermissionRequest(PermissionRequest request) {
// //   final String[] requestedResources = request.getResources();
// //   for (String r : requestedResources) {
// //     if (r.equals(PermissionRequest.RESOURCE_VIDEO_CAPTURE) || r.equals(PermissionRequest.RESOURCE_AUDIO_CAPTURE)) {
// //       request.grant(new String[]{
// //       PermissionRequest.RESOURCE_VIDEO_CAPTURE,
// //       PermissionRequest.RESOURCE_AUDIO_CAPTURE
// //       });
// //       break;
// //     }
// //   }
// //   //request.grant(request.getResources());
// // }