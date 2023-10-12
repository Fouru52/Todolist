// 삭제 추가를 하다보면 id값이 꼬임 => id를 고유한 값으로 바꿈
const items = document.querySelector('.items') // ul.items
const input = document.querySelector('.footer_input') 
const addBtn = document.querySelector('.footer_addBtn')

// let id = 0; 이 방법은 id가 겹치는 문제 발생
let todoList = []; 

// 로컬 스토리지에 배열을 집어 넣는 함수 정의
const save = () => {
  localStorage.setItem('toList', JSON.stringify(todoList))
  // 로컬 스토리지에 저장하는 오브젝트를 json형태로 바꿔줘야함.
}

// 로컬스토리지에 저장된 것을 가져오는 함수
const init = () => {
  const userList = JSON.parse(localStorage.getItem('toList'))
  //console.log(userList);

    if(userList) {
      userList.forEach(obj => {
        createItem(obj);
        todoList = userList;
      });
    }
  }
init();

const onAdd = () => {
const list = { // id,text 포함하는 오브젝트를 만듬
  id: Date.now(), // UTC 시간부터 현재까지 몇초 지났는지 알아오는 메소드 - id에 이용
  text: input.value
}

if(list.text == ''){  // 입력 내용이 없으면 onAdd에서 빠져나감
  input.focus();
  return;
}

todoList.push(list); 
// todoList(배열) 안에 list(오브젝트) 집어넣기
save() //배열을 로컬 스토리지에 저장하는 함수 실행



  createItem(list); 
  // 인자에 오브젝트를 넣어서 createItem함수 실행
  
  input.value = '';
  input.focus();

  console.log('todoList - ', todoList);
}

// 새로운 아이템 만드는 함수정의 - 프레임워크를 이용한 방법 (프론트엔드 방식)
  function createItem(list){
    const itemRow = document.createElement('li')
    itemRow.className = 'item_row';
    itemRow.setAttribute('data-id', list.id) 

    // 문자 리터럴 방법
    itemRow.innerHTML = `
    <div class="item">
      <span class="item_name">${list.text}</span>
      <button class="item_delBtn">
        <i class="fa-solid fa-trash-can" data-id=${list.id}></i>
      </button>
    </div>
    <div class="item_divider"></div>
    `
    //id++; 
    items.append(itemRow) // onAdd 함수에 있던 것 옮겨옴
    itemRow.scrollIntoView();
    return itemRow
  }

addBtn.addEventListener('click', onAdd)

input.addEventListener('keypress', event =>{
  event.key === 'Enter' && onAdd();
})



/*
  이벤트 위임을 이용한 삭제 (쓰레기통을 클릭했을 때 삭제)
*/
items.addEventListener('click', e =>{
  const clickId = e.target.dataset.id; // 몇번째 id를 클릭했는지 알아옴
  console.log('클릭한 쓰레기통의 id는?', clickId);
  if(clickId) {
    const toBeDeleted = document.querySelector(`.item_row[data-id="${clickId}"]`);
    toBeDeleted.remove();

    // 로컬스토리지도 삭제
    todoList = todoList.filter(aa => aa.id != clickId)
    save()
  }
})