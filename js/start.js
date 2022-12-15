const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 5; //질문 갯수
const select = [0,0,0,0,0,0,0]; //데이터들이 선택된 만큼 카운팅 할 배열

function calResult(){
    
    //배열의 최댓값을 가지는 index를 반환 (전개구문)
    var result = select.indexOf(Math.max(...select));
    
    return result;
}

//[4] 알맞는 결과데이터 띄워주는 함수
function setResult(){
    //가장 많이 선택 된 책번호
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    //img요소 생성
    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    // 최다득표 책번호에 맞는 이미지파일
    var imgURL = 'img/image-'+point+ '.jpeg';

    // img요소에 이미지 정보 붙여줌
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    // 이미지 들어오는 자리에 img요소 붙여줌 == <div id="resultImg"><img></div>
    imgDiv.appendChild(resultImg);

    //책 설명 붙여줌
    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

//[3b] 결과화면 띄워주는 함수(마지막 질문화면 숨기고 결과화면 나타남)
function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block"
        }, 450)
    })
    //[4] 결과 함수 호출
    setResult();
}

//[3a] 화면에 답변리스트 붙임
function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    
    //버튼에 클래스 값들 넣어줌
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    //answer(버튼)를 a(.answerBox)안에 넣어줌 ==  <div><button></div>
    a.appendChild(answer);
    //answer(버튼)에 답변text 넣어줌
    answer.innerHTML = answerText;
    
    //answer(버튼) 클릭하면
    answer.addEventListener("click", function(){
        //.answerList를 가진 태그들(배열)
        var children = document.querySelectorAll('.answerList');
        //버튼 다 없어지게 함
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;    //버튼 비활성화
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(()=>{
            //답변이 가진 데이터(책 번호)
            var target = qnaList[qIdx].a[idx].type;
            //데이터만큼 반복
            for(let i =0; i<target.length; i++){
                //select배열에서 데이터 자리에 1을 더함
                select[target[i]] += 1;
            }
            for(let i = 0; i < children.length; i++){
                children[i].style.display = 'none';
            }
            //다음 값 호출되도록 번호 늘려줌
            goNext(++qIdx);
        },450)
    }, false);
}

//[2]다음 질문페이지 띄워줌
function goNext(qIdx){
    //마지막 질문일때는
    if(qIdx === endPoint){
        //[3b] 결과화면 띄워줌
        goResult();
        return;
    }

    // 질문화면 텍스트 뿌리기
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    // 답변 버튼 뿌리기(qnaList배열의 qIdx번째에 있는 a의 길이만큼(answer) 반복)
    for(let i in qnaList[qIdx].a){  //for(var i=0; i<qnaList[qIdx].a.length; i++)
        //[3a] 화면에 답변뿌리기(답변text, 질문번호, 답변번호)
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    // 질문 갯수에 맞춰서 진행 바 늘리기
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1)+'%';
}

// [1]시작하기 눌렀을 때 호출 될 함수
function begin(){
    //시작 화면 사라지게함
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    //0.45초 후에 실행되는 함수
    setTimeout(() => {
        //질문 화면 나타나게 함
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        //0.45초 후에 실행되는 함수
        setTimeout(() => {
            //시작 화면 숨기고 질문 화면 띄움
            main.style.display = "none";
            qna.style.display = "block"
        }, 450)
        //질문 갯수
        let qIdx = 0;
        //[2] 0번 들고 다음페이지로 가는거임!!
        goNext(qIdx);
    }, 450);
}
