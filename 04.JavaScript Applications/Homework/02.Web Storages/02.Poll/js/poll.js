var body = document.body;

if(!localStorage.name){
    var label = document.createElement('label'),
        input = document.createElement('input');

    label.setAttribute('for', 'name');
    label.innerText = 'Name:';
    input.setAttribute('id', 'name');
    input.setAttribute('type', 'text');
    input.addEventListener('change', addNameToLocalStorage);

    body.appendChild(label);
    body.appendChild(input);

}else {
        localStorage.setItem('points', 0);

        var questions = '1. Inside which HTML element do we put the JavaScript?^&lt;script&gt;|&lt;javascript&gt;|&lt;scripting&gt;|&lt;js&gt;$2. What is the correct JavaScript syntax to change the content of the HTML element below?' + '</br>' + '</br>' + '</br>' + '&lt;p id=&quot;demo&quot;&gt;This is a demonstration.&lt;/p&gt;Submit^document.getElementByName(&quot;p&quot;).innerHTML = &quot;Hello World!&quot;;|document.getElement(&quot;p&quot;).innerHTML = &quot;Hello World!&quot;;|#demo.innerHTML = &quot;Hello World!&quot;;|document.getElementById(&quot;demo&quot;).innerHTML = &quot;Hello World!&quot;;$3. Where is the correct place to insert a JavaScript?^The &lt;body&gt; section|Both the &lt;head&gt; section and the &lt;body&gt; section are correct|The &lt;head&gt; section$4. What is the correct syntax for referring to an external script called &quot;xxx.js&quot;?^&lt;script name=&quot;xxx.js&quot;&gt;|&lt;script src=&quot;xxx.js&quot;&gt;|&lt;script href=&quot;xxx.js&quot;&gt;';
        var correctAnswers = ['1', '4', '2', '2'],
            wrapper = document.getElementById('wrapper'),
            timerElement = document.getElementById('timer'),
            pointsElement = wrapper.getElementsByTagName('span')[1];


        loadQuestions(questions, wrapper);

        var delay = localStorage.getItem('remaining') || 300000,
            timer = new Timer(delay, submit),
            updaterOfTimer = setInterval(function () {
                var time = new Date(timer.getTimeLeft()),
                    mins = time.getUTCMinutes(),
                    seconds = time.getUTCSeconds();
                if((mins + seconds) <= 0){
                    clearInterval(updaterOfTimer);
                }
                timerElement.innerText = mins + ':' + (seconds.toString().length === 2 ? seconds : ('0' + seconds));
            }, 1000),
            submitButton = document.createElement('button');
            submitButton.setAttribute('id', 'submit-button');
            submitButton.innerText = 'Submit';
            submitButton.addEventListener('click', submit);
            wrapper.appendChild(submitButton);

        window.onunload = function() {
            var allQuestionWrappers = document.getElementsByClassName('question-wrapper');
            [].forEach.call(allQuestionWrappers, function (questionWrapper) {
                var currentId = questionWrapper.getAttribute('id');
                [].forEach.call(questionWrapper.getElementsByTagName('ul')[0].children, function (liElem) {
                    var currentCheckBox = liElem.getElementsByTagName('input')[0];
                    if (currentCheckBox.checked) {
                        localStorage.setItem(currentId.toString(), currentCheckBox.id.toString());
                    }
                });
            });
            localStorage.setItem('remaining', timer.getTimeLeft());
        };


}

function submit(){
    checkAnswers();
    addToLocalStorage();
    //clearLocalStorage();
}

function addToLocalStorage(){
    localStorage.setItem('points', localStorage.getItem('points') + 1);
    pointsElement.innerText = localStorage.getItem('points');
    alert(localStorage.getItem('points'));
}
function addNameToLocalStorage(){
    localStorage.setItem('name', this.value);
}

function checkAnswers(){
    var allUls = document.getElementsByTagName('ul'),
        length = allUls.length,
        index,
        currentUl,
        idOfChecked,
        checkedLiElem;

    for(index = 0; index < length; index++){
        currentUl = allUls[index];
        [].forEach.call(currentUl.getElementsByTagName('li'), function(currentLi){
            var currentCheckBox = currentLi.getElementsByTagName('input')[0];
            if(currentCheckBox.checked){
                idOfChecked = currentCheckBox.id;
                checkedLiElem = currentLi;
                if(idOfChecked === correctAnswers[index]){
                    localStorage.setItem('points', Number(localStorage.getItem('points')) + 1);
                    alert(localStorage.getItem('points'));
                    pointsElement.innerText =  localStorage.getItem('points');
                    checkedLiElem.style.backgroundColor = 'green';
                }else{
                    checkedLiElem.style.backgroundColor = 'red';
                }
            }
        });


    }

}

function loadQuestions(questions, wrapper){
    var questionsArray = questions.split('$'),
        id = 1;

    questionsArray.forEach(function(question){
        var answerId = 1,
            input,
            label,
            li,
            answers = question.split('^')[1].split('|'),
            questionWrapper = document.createElement('div'),
            ul = document.createElement('ul'),
            p = document.createElement('p'),
            ulFragment = document.createDocumentFragment();


        question = question.split('^')[0];
        questionWrapper.setAttribute('id', id.toString());
        questionWrapper.setAttribute('class', 'question-wrapper')
        id++;
        p.innerHTML = question;
        ul.appendChild(p);

        answers.forEach(function(answer){
            var liFragment = document.createDocumentFragment();
            li = document.createElement('li');
            input = document.createElement('input');
            label = document.createElement('label');
            input.setAttribute('type','checkbox');
            input.setAttribute('id', answerId.toString());
            label.setAttribute('for', answerId.toString());
            label.innerHTML = answer;
            input.addEventListener('change', uncheckOtherBoxes);
            liFragment.appendChild(input);
            liFragment.appendChild(label);
            li.appendChild(liFragment);
            answerId++;


            ulFragment.appendChild(li);
        });

        ul.appendChild(ulFragment);
        questionWrapper.appendChild(ul);
        wrapper.appendChild(questionWrapper);
    });

    function uncheckOtherBoxes(){
        if(this.checked){
            var ulParent = this.parentElement.parentElement,
                listElements = ulParent.getElementsByTagName('li');

            [].forEach.call(listElements, function (listElement) {
                listElement.getElementsByTagName('input')[0].checked = false;
            });

            this.checked = true;
        }
    }

}