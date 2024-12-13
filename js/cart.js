//index.html 이동
function goToHome(){
  window.location.href = 'index.html';
}
/* 
1. 장바구니에 데이터 불러오기
- 로컬 스토리지에 저장된 장바구니 데이터
2. 선택된 상품 가격 계산
- 체크박스로 선택한 상품의 가격만 모아서 합산
3. 장바구니 비우기 버튼
*/
// 장바구니에서 상품을 불러오는 함수
function loadCartItems(){
  //장바구니 항목 표시 컨테이너 변수로 저장
  let cartItemsContainer = document.getElementById('cart-items')
  //로컬 스토리지에서 데이터 가져오기 없으면 빈배열
  let cart = JSON.parse(localStorage.getItem('cart'))||[];
  let total = 0;
  //장바구니 목록 초기화
  cartItemsContainer.innerHTML = '';
  cart.forEach((item)=>{
    let itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML=`
      <input type="checkbox" class="item-select"
      onclick='updateTotal()' data-price="${item.price}" checked>
      ${item.title} - ￦${item.price}
      <img src="${item.image}" alt="${item.title}" class="thumbnail-small">
    `
    //항목을 컨텐츠에 추가
    cartItemsContainer.appendChild(itemElement);
    total += item.price;
  })
  //계산한 총합 화면에 표시
  document.getElementById('total').innerText =`₩${total}`;
}
// 상품 총 합산 구하는 함수
function updateTotal(){
  let items = document.querySelectorAll('.item-select');
  let total = 0;
  //선택된 항목의 가격 더하기
  items.forEach(item =>{
    if(item.checked){
      total += parseInt(item.getAttribute('data-price'))
    }
  });
  //화면표시
  document.getElementById('total').innerText=`₩${total}`
}
// 장바구니 비우기 함수
function clearCart(){
  localStorage.removeItem('cart');
  alert('장바구니가 비워졌습니다.')
  loadCartItems();
}

loadCartItems();