// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()





//가격 계산해서 표시하기
window.addEventListener('DOMContentLoaded', (event) => {
  var priceElements = document.getElementsByClassName('price');
  var totalPrice = 0;
  
  for (var i = 0; i < priceElements.length; i++) {
    var priceText = priceElements[i].textContent;
    
    // 쉼표와 공백을 제거한 후 문자열을 숫자로 변환
    var priceValue = parseFloat(priceText.replace(/,| /g, ''));
    
    if (!isNaN(priceValue)) {
      totalPrice += priceValue;
    }
  }
  
  var totalValueElement = document.getElementById('totalValue');
  totalValueElement.textContent = totalPrice.toLocaleString() + ' 원';
});




    // 우편번호 찾기 화면을 넣을 element
    var element_layer = document.getElementById('layer');

    function closeDaumPostcode() {
        // iframe을 넣은 element를 안보이게 한다.
        element_layer.style.display = 'none';
    }

    function sample2_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    document.getElementById("sample2_extraAddress").value = extraAddr;
                
                } else {
                    document.getElementById("sample2_extraAddress").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample2_postcode').value = data.zonecode;
                document.getElementById("sample2_address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("sample2_detailAddress").focus();

                // iframe을 넣은 element를 안보이게 한다.
                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                element_layer.style.display = 'none';
            },
            width : '100%',
            height : '100%',
            maxSuggestItems : 5
        }).embed(element_layer);

        // iframe을 넣은 element를 보이게 한다.
        element_layer.style.display = 'block';

        // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
        initLayerPosition();
    }

    // 브라우저의 크기 변경에 따라 레이어를 가운데로 이동시키고자 하실때에는
    // resize이벤트나, orientationchange이벤트를 이용하여 값이 변경될때마다 아래 함수를 실행 시켜 주시거나,
    // 직접 element_layer의 top,left값을 수정해 주시면 됩니다.
    function initLayerPosition(){
        var width = 300; //우편번호서비스가 들어갈 element의 width
        var height = 400; //우편번호서비스가 들어갈 element의 height
        var borderWidth = 5; //샘플에서 사용하는 border의 두께

        // 위에서 선언한 값들을 실제 element에 넣는다.
        element_layer.style.width = width + 'px';
        element_layer.style.height = height + 'px';
        element_layer.style.border = borderWidth + 'px solid';
        // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
        element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
        element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
        element_layer.style.zIndex = 888
    }

    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('code').addEventListener('submit', function(event) {
        event.preventDefault();

        
      var codeInput = document.getElementById('code_form');

        var codeValue = codeInput.value; // 값을 가져옵니다.
    


        var inputLength = codeValue.length;
    
        // 글자 수가 10자리가 아닌 경우 code_error() 함수를 호출합니다.
        if (inputLength !== 10) {
          code_error(inputLength);
        }

        else if (inputLength == 10) {
          const Price = 5000
          const kind = '배송비 할인 쿠폰'
          code_ok(Price,kind);
        }
        console.log('쿠폰 값: ' + codeValue);

      
      
    });
  });

  


  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('pay').addEventListener('submit', function (e) {
      e.preventDefault(); 

    
      Swal.fire({
        title: '알림',
        text: '현 페이지는 포트폴리오 프로젝트 페이지로 결제시 실제 결제가 진행이 되나 물건 발송 등 결제외에는 아무것도 진행되지 않음으로 주의 해 주세요.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소', // 취소 버튼 텍스트 추가
      }).then((result) => {
        if (result.isConfirmed) {
          // 사용자가 확인 버튼을 클릭한 경우
          payappPay();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // 사용자가 취소 버튼을 클릭한 경우
          // 여기에 취소 처리 로직 추가
        }
      });
      
      

      
    });
  });

    //할인 및 구매코드가 10자리가 아닐때 경고
  function code_error(inputLength) {

    Swal.fire('오류', '코드를 10자리로 입력 해 주세요.'+ '<br>' +`입력된 코드 수: ${inputLength}`, 'warning');

  }

    //할인 및 구매코드가 정상적으로 처리되었을때 경고

  function code_ok(Price,kind) {
    (async () => {

        const { value: accept } = await Swal.fire({
          title: kind + ' 등록',
          input: 'checkbox',
          inputValue: false, 
          inputValue: 1,
          inputPlaceholder: kind + '을 등록하려면 체크박스를 체크해주세요.',
          confirmButtonText:
            'Continue <i class="fa fa-arrow-right"></i>',
          inputValidator: (result) => {
            return !result && '체크박스를 체크하지 않았습니다.'
          }
        })
        
        if (accept) {
          Swal.fire('등록되었습니다.')
        }
        
        })
  }




  function code_look() {
    (async () => {
      const { value: fruit } = await Swal.fire({
        title: '쿠폰 선택',
        input: 'select',
        inputOptions: {
          '': {
            '10': '배송비 3000원 할인쿠폰',
            '할인': '배송비 5000원 할인쿠폰',
            '물품': '앱코 키보드 k653',
            '물품': '매직 마우스 2세대'
          }
        },
        inputPlaceholder: '쿠폰 선택',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === '쿠폰 선택') {
              resolve('쿠폰을 선택해 주세요.');
            } else {
              resolve();
            }
          })
        }
      });
    
      if (fruit) {
        Swal.fire(fruit + ' 쿠폰이 정상적으로 추가 되었습니다.');
      }
    })();
    
    
  }



  PayApp.setDefault('userid',     'sjw9179');
  PayApp.setDefault('shopname',   'Coding Dream');
  function payappPay(){
    var pay_phone = document.getElementById('pay_phone').value; // 결제 본인 핸드폰 번호
    var email = document.getElementById('email').value;  //이메일 정보


    var priceElements = document.getElementsByClassName('price');
    var totalPrice = 0;
    
    for (var i = 0; i < priceElements.length; i++) {
      var priceText = priceElements[i].textContent;
      
      // 쉼표와 공백을 제거한 후 문자열을 숫자로 변환
      var priceValue = parseFloat(priceText.replace(/,| /g, ''));
      
      if (!isNaN(priceValue)) {
        totalPrice += priceValue;
      }
    }



    var paymentMethodRadioButtons = document.querySelectorAll('input[name="paymentMethod"]');

    // 선택된 값을 저장할 변수를 초기화합니다.
    var selectedPaymentMethod = null;
  
    // 라디오 버튼 그룹을 순회하며 선택된 값을 찾습니다.
    for (var i = 0; i < paymentMethodRadioButtons.length; i++) {
      if (paymentMethodRadioButtons[i].checked) {
        selectedPaymentMethod = paymentMethodRadioButtons[i].value;
        break; // 선택된 값이 이미 찾아졌으므로 루프 종료
      }
    }
  




    PayApp.setParam('shopname', 'Coding Dream Shop');
      PayApp.setParam('goodname', '상품명');
      PayApp.setParam('price', 1000);
      PayApp.setParam('recvphone', pay_phone );
      PayApp.setParam('recvemail', email);
      PayApp.setParam('redirect', 'self');
      PayApp.setParam('smsuse', 'n');
      PayApp.setParam('openpaytype', selectedPaymentMethod);
      PayApp.setParam('redirectpay', '1');
      PayApp.setParam('skip_cstpage', 'y');
      PayApp.setParam('redirecturl', 'https://coding-dream.netlify.app/pay/index.html');
      PayApp.call();


      


  }
