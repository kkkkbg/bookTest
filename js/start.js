const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 5;
const select = [0,0,0,0,0,0,0]; 

function calResult(){
    
    //배열의 최댓값을 가지는 index를 반환 (전개구문)
    var result = select.indexOf(Math.max(...select));
    
    return result;
}

function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-'+point+ '.jpeg';

    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

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
    setResult();
}
function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    
    //버튼에 클래스 값들 넣어줌
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    //버튼(answer)를 a안에 넣어줌   <div><button></div>
    a.appendChild(answer);
    answer.innerHTML = answerText;
    
    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        //답변 선택하면 버튼 다 없어지게 함
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(()=>{
            var target = qnaList[qIdx].a[idx].type;
            for(let i =0; i<target.length; i++){
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

function goNext(qIdx){
    if(qIdx === endPoint){
        goResult();
        return;
    }

    // 질문 텍스트 뿌리기
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    // 답변 버튼 뿌리기
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    // 진행 바
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1)+'%';
}

function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block"
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}