import React, {useEffect} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const File = () => {
  const directoryPath = '/storage/emulated/0/AudioRecorder/my_sounds/';

  const checkAndRequestPermission = async () => {
    const status = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

    if (status === RESULTS.GRANTED) {
      // 권한이 승인되었을 때 파일 읽기 및 업로드 작업 수행
      getMostRecentFile();
    } else {
      const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (result === RESULTS.GRANTED) {
        // 권한이 승인되면 파일 읽기 및 업로드 작업 수행
        getMostRecentFile();
      } else {
        // 권한이 거부됨
        console.log('권한이 거부되었습니다.');
      }
    }
  };

  const getMostRecentFile = async () => {
    try {
      const files = await RNFetchBlob.fs.ls(directoryPath);

      if (files.length > 0) {
        // 파일을 생성 날짜에 따라 정렬 (최신 파일이 배열의 첫 번째)
        files.sort(async (a, b) => {
          const statA = await RNFetchBlob.fs.stat(`${directoryPath}${a}`);
          const statB = await RNFetchBlob.fs.stat(`${directoryPath}${b}`);
          return statB.lastModified - statA.lastModified;
        });

        const mostRecentFile = files[0];
        const filePath = `${directoryPath}${mostRecentFile}`;

        // filePath를 이용하여 파일 읽기 및 서버 업로드 작업 수행
        RNFetchBlob.fs
          .readFile(filePath, 'base64')
          .then(data => {
            // 파일 데이터(data)를 서버로 업로드
            // 업로드 코드를 추가해야 합니다.
            console.log('파일 내용:');
          })
          .catch(error => {
            console.error('파일 읽기 오류:', error);
          });
      } else {
        console.log('디렉토리에 파일이 없습니다.');
      }
    } catch (error) {
      console.error('디렉토리 스캔 오류:', error);
    }
  };

  useEffect(() => {
    checkAndRequestPermission();
  }, []);
};

export default File;
