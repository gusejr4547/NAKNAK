import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:geolocator/geolocator.dart';

class Loading extends StatefulWidget {
  const Loading({Key? key}) : super(key: key);

  @override
  State<Loading> createState() => _LoadingState();
}

class _LoadingState extends State<Loading> {
  Position? currentPosition; // 위치 정보를 저장하기 위한 변수

  void getLocation() async {
    bool isLocationServiceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!isLocationServiceEnabled) {
      showLocationServiceAlertDialog(); // 위치 서비스가 꺼져있을 때 대화 상자를 표시
      return;
    }

    PermissionStatus permissionStatus = await Permission.location.request();
    if (permissionStatus.isGranted) {
      try {
        Position position = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.high,
        );
        setState(() {
          currentPosition = position;
        });
        print("Current Position: $currentPosition");
      } catch (e) {
        print("Error getting location: $e");
      }
    } else if (permissionStatus.isDenied || permissionStatus.isPermanentlyDenied) {
      // 위치 권한이 필요한 이유에 대해 사용자에게 대화 상자나 스낵바를 통해 설명합니다.
    }
  }

  // 위치 서비스가 꺼져있을 때 대화 상자를 표시하는 함수
  void showLocationServiceAlertDialog() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('위치 서비스가 꺼져있습니다.'),
          content: Text('위치 정보를 사용하려면 위치 서비스를 켜주세요.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('취소'),
            ),
            TextButton(
              onPressed: () {
                openAppSettings(); // 앱 설정으로 이동하여 위치 서비스를 켤 수 있도록 유도
                Navigator.of(context).pop();
              },
              child: Text('설정 열기'),
            ),
          ],
        );
      },
    );
  }
  // void getLocation() async {
  //   try {
  //     Position position = await Geolocator.getCurrentPosition(
  //       desiredAccuracy: LocationAccuracy.high,
  //     );
  //     setState(() {
  //       currentPosition = position; // 현위치 데이터를 상태 변수에 저장
  //     });
  //     print("Current Position: $currentPosition");
  //   } catch (e) {
  //     print("Error getting location: $e");
  //   }
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Loading'),
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: getLocation,
              child: Text('Get Current Location'),
            ),
            if (currentPosition != null) // 위치 데이터가 있을 때만 출력
              Text(
                '현재 위치: 위도=${currentPosition!.latitude}, 경도=${currentPosition!.longitude}',
                style: TextStyle(fontSize: 16),
              ),
          ],
        ),
      ),
    );
  }
}