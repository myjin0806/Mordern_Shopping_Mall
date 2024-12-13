/* 
  1. 페이지 로드시 장바구니 개수 표시
  2. 상품 목록을 product-list에 렌더링
  3. 장바구니에담기 누르면 로컬 스토리지에 상품 저장됨, 장바구니 개수 업데이트, 알림 창 생성
  4. 하트 클릭시 상태 전환
  5. 전체삭제 누를 시 삭제
 */
/* 
  상품 보여주기 함수
  하트 토글 함수
  카트 추가 함수
  카운트 업데이트 함수
*/

//홈으로 이동
function goToHome(){
  window.location.href= 'index.html';
}

//장바구니 페이지 이동
function goToCart(){
  window.location.href = 'cart.html';
}

// 상품 데이터
const products = [
  { id: 1, title: '미니멀 블랙 의자', price: 79000, discount: 89000, image: 'images/item01.jpg' },
  { id: 2, title: '모던 화이트 테이블', price: 129000, discount: 150000, image: 'images/item02.jpg' },
  { id: 3, title: '포근한 그레이 소파', price: 239000, discount: 270000, image: 'images/item03.jpg' },
  { id: 4, title: '우아한 플로어 램프', price: 59000, discount: 75000, image: 'images/item04.jpg' },
  { id: 5, title: '슬림한 책장', price: 99000, discount: 120000, image: 'images/item05.jpg' },
  { id: 6, title: '빈티지 원목 침대', price: 349000, discount: 400000, image: 'images/item06.jpg' },
  { id: 7, title: '럭셔리 대형 소파', price: 499000, discount: 550000, image: 'images/item07.jpg' },
  { id: 8, title: '편안한 라운지 체어', price: 159000, discount: 180000, image: 'images/item08.jpg' },
  { id: 9, title: '클래식 커피 테이블', price: 79000, discount: 99000, image: 'images/item09.jpg' },
  { id: 10, title: '모던 테이블 램프', price: 49000, discount: 60000, image: 'images/item10.jpg' },
  { id: 11, title: '컴팩트 책상', price: 119000, discount: 140000, image: 'images/item11.jpg' },
  { id: 12, title: '미니멀 선반', price: 59000, discount: 75000, image: 'images/item12.jpg' },
  { id: 13, title: '빈티지 나무 의자', price: 49000, discount: 60000, image: 'images/item13.jpg' },
  { id: 14, title: '고급 거실 러그', price: 159000, discount: 200000, image: 'images/item14.jpg' },
  { id: 15, title: '에코 플랜트 화분', price: 39000, discount: 50000, image: 'images/item15.jpg' },
  { id: 16, title: '스탠딩 드레스 거울', price: 79000, discount: 99000, image: 'images/item16.jpg' },
  { id: 17, title: '심플 화이트 커튼', price: 29000, discount: 40000, image: 'images/item17.jpg' },
  { id: 18, title: '폴딩 라탄 의자', price: 89000, discount: 100000, image: 'images/item18.jpg' },
  { id: 19, title: '네추럴 우드 선반', price: 69000, discount: 80000, image: 'images/item19.jpg' },
  { id: 20, title: '컴팩트 수납장', price: 139000, discount: 160000, image: 'images/item20.jpg' },
  { id: 21, title: '모던 침대 프레임', price: 259000, discount: 300000, image: 'images/item21.jpg' },
  { id: 22, title: '라운드 사이드 테이블', price: 49000, discount: 70000, image: 'images/item22.jpg' },
  { id: 23, title: '빈티지 메탈 체어', price: 69000, discount: 80000, image: 'images/item23.jpg' },
  { id: 24, title: '우든 벤치', price: 129000, discount: 150000, image: 'images/item24.jpg' },
  { id: 25, title: '코지 코너 소파', price: 299000, discount: 350000, image: 'images/item25.jpg' },
  { id: 26, title: '모던 TV 스탠드', price: 199000, discount: 250000, image: 'images/item26.jpg' },
  { id: 27, title: '골드 테이블 세트', price: 399000, discount: 450000, image: 'images/item27.jpg' }
];

//상품목록 보여주기 함수
function renderProducts(){
  let productContainer = document.querySelector('.product-list');
  productContainer.innerHTML="";
  products.forEach(product=>{
    let productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.innerHTML =`
    <img src="${product.image}" alt="${product.image}" class="thum">
    <div class="heart"><i class="fa-regular fa-heart" onclick="heartToggle(event)"></i></div>
    <div class="product-info">
      <h2 class="product-title">${product.title}</h2>
      <div class="price-wrap">
        <p class="discount">￦${product.discount}</p>
        <p class="price">￦${product.price}</p>
      </div>
      <button class="add-to-cart" onclick="addToCart(${product.id})">장바구니 담기</button>
    </div>
    `
    productContainer.appendChild(productItem);
  })
}

//상품 목록 렌더링
renderProducts();

//하트 토글 함수 
function heartToggle(event){
  event.preventDefault();
  //조건문
  let heartIcon ;
  if(event.target.classList.contains('fa-heart')){
    heartIcon = event.target;
  }else{
    heartIcon = event.target.querySelector('i')
  }
  //문자열 바꿔주기
  //채워진 하트 fa-solid, 선하트 fa-regular를 토글하고 색상변경
  if(heartIcon.classList.contains('fa-regular')){
    heartIcon.classList.replace('fa-regular','fa-solid')
  }else{
    heartIcon.classList.replace('fa-solid','fa-regular')
  }
}

//장바구니에 상품추가
function updateCartCount(){
  let cart = JSON.parse(localStorage.getItem('cart'))||[];
  const cartCount = cart.length;
  let cartCountElement = document.querySelector('.cart-count');
  //장바구니에 상품이 있으면 개수 표시, 없으면 숨김
  if(cartCount>0){
    cartCountElement.textContent = cartCount;
    cartCountElement.classList.add('active');
  }else{
    cartCountElement.textContent = "";
    cartCountElement.classList.remove('active');
  }
}

//장바구니 개수 업데이트
function addToCart(productId){
  let product = products.find(p => p.id ===productId);
  let cart = JSON.parse(localStorage.getItem('cart'))||[];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.title}이(가) 장바구니에 추가되었습니다.`);
  updateCartCount();
}

//상품을 추가 후 장바구니 개수 업데이트


//페이지 로드 시 장바구니 개수 초기화
document.addEventListener('DOMContentLoaded',()=>{
  updateCartCount();
})


/* 
let num= [1,2,3,4,5];
let result = num.find(num => num>3);
console.log(result) //4
let num2 = [5, 8 ,15,4,10];
let result2 = num2.find(num2 => num>10);
console.log(result2) //15
*/
