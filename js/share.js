const url = 'https://before2pm.netlify.app/';

//카톡공유버튼 클릭했을 때 호출. 결과 화면에서 결과 번호를 받음
function setShare(){
    var resultImg = document.querySelector('#resultImg');
    var resultAlt = resultImg.firstElementChild.alt;  //책번호
    const shareTitle = '두시전테스트 결과';
    const shareDes = infoList[resultAlt].name;  //책이름
    const shareImage = url + 'img/image-' + resultAlt + '.jpeg';
    const shareURL = url + 'page/result-' + resultAlt + '.html';  //이거 해줄려고 html 하나하나 만든거임!!
    
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: shareTitle,
          description: '내 최애 책은 '+shareDes+'(✿◡‿◡)',
          imageUrl: shareImage,
          link: {
            mobileWebUrl: shareURL,
            webUrl: shareURL,
          },
        },
        buttons: [
          {
            title: '결과 구경가기',
            link: {
              mobileWebUrl: shareURL,
              webUrl: shareURL,
            },
          },
        ]
      });
}
