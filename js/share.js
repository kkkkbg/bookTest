const url = 'https://before2pm.netlify.app/';

//결과 화면에서 결과 번호를 받음
function setShare(){
    var resultImg = document.querySelector('#resultImg');
    var resultAlt = resultImg.firstElementChild.alt;
    const shareTitle = '두시전테스트 결과';
    const shareDes = infoList[resultAlt].name;
    const shareImage = url + 'img/image-' + resultAlt + '.jpeg';
    const shareURL = url + 'page.result-' + resultAlt + '.html';
    
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: shareTitle,
          description: '내 최애 책은 '+shareDes+'(✿◡‿◡)',
          imageUrl: shareImage,
          link: {
            mobileWebUrl: 'shareURL',
            webUrl: 'shareURL',
          },
        },
        buttons: [
          {
            title: '님두 한번 해보시겟어요?',
            link: {
              mobileWebUrl: 'shareURL',
              webUrl: 'shareURL',
            },
          },
        ]
      });
}