
// ページの読み込みが完了したらコールバック関数が呼ばれる
// ※コールバック: 第2引数の無名関数(=関数名が省略された関数)
window.addEventListener('load', () => {
  const canvas = document.querySelector('#draw-area');
  // contextを使ってcanvasに絵を書いていく
  const context = canvas.getContext('2d');

  // 直前のマウスのcanvas上のx座標とy座標を記録する
  const lastPosition = { x: null, y: null };

  // マウスがドラッグされているか(クリックされたままか)判断するためのフラグ
  let isDrag = false;

  // 絵を書く
  function draw(x, y) {
    // マウスがドラッグされていなかったら処理を中断する。
    // ドラッグしながらしか絵を書くことが出来ない。
    if(!isDrag) {
      return;
    }

    // 線の状態を定義する
    context.lineJoin = 'round'; 
    context.lineWidth = 1; 
    context.strokeStyle = 'black'; 

    if (lastPosition.x === null || lastPosition.y === null) {
      // ドラッグ開始時の線の開始位置
      context.moveTo(x, y);
    } else {
      // ドラッグ中の線の開始位置
      context.moveTo(lastPosition.x, lastPosition.y);
    }
    
    context.lineTo(x, y);

    context.stroke();

    // 現在のマウス位置を記録して、次回線を書くときの開始点に使う
    lastPosition.x = x;
    lastPosition.y = y;
  }

  // canvas上に書いた絵を全部消す
  function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }


  function dragStart(event) {
    
    context.beginPath();

    isDrag = true;
  }
  
  function dragEnd(event) {
    // 線を書く処理の終了を宣言する
    context.closePath();
    isDrag = false;

    // 描画中に記録していた値をリセットする
    lastPosition.x = null;
    lastPosition.y = null;
  }

  // マウス操作やボタンクリック時のイベント処理を定義する
  function initEventHandler() {
    const clearButton = document.querySelector('#clear-button');
    clearButton.addEventListener('click', clear);

    canvas.addEventListener('mousedown', dragStart);
    canvas.addEventListener('mouseup', dragEnd);
    canvas.addEventListener('mouseout', dragEnd);
    canvas.addEventListener('mousemove', (event) => {

      draw(event.layerX, event.layerY);
    });
  }

  // イベント処理を初期化する
  initEventHandler();
});

// - 線の色を変更する機能
// - 消しゴム機能
window.addEventListener('load', () => {
  const canvas = document.querySelector('#draw-area');
  const context = canvas.getContext('2d');
  const lastPosition = { x: null, y: null };
  let isDrag = false;
 
  let currentColor = '#000000';
 
  function draw(x, y) {
    if(!isDrag) {
      return;
    }
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 5;
    context.strokeStyle = currentColor;
    if (lastPosition.x === null || lastPosition.y === null) {
      context.moveTo(x, y);
    } else {
      context.moveTo(lastPosition.x, lastPosition.y);
    }
    context.lineTo(x, y);
    context.stroke();
 
    lastPosition.x = x;
    lastPosition.y = y;
  }
 
  function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
 
  function dragStart(event) {
    context.beginPath();
 
    isDrag = true;
  }
 
  function dragEnd(event) {
    context.closePath();
    isDrag = false;
    lastPosition.x = null;
    lastPosition.y = null;
  }
 
  function initEventHandler() {
    const clearButton = document.querySelector('#clear-button');
    clearButton.addEventListener('click', clear);
 
    const eraserButton = document.querySelector('#eraser-button');
    eraserButton.addEventListener('click', () => {
      currentColor = '#FFFFFF';
    });
 
    canvas.addEventListener('mousedown', dragStart);
    canvas.addEventListener('mouseup', dragEnd);
    canvas.addEventListener('mouseout', dragEnd);
    canvas.addEventListener('mousemove', (event) => {
      draw(event.layerX, event.layerY);
    });
  }
 
  // カラーパレットの設置
  function initColorPalette() {
    const joe = colorjoe.rgb('color-palette', currentColor);
 
    joe.on('done', color => {
      currentColor = color.hex();
    });
  }
 
  initEventHandler();
 
  // カラーパレット情報を初期化する
  initColorPalette();

  $('draw-area').on('submit', function(e){
    e.preventDefault();
    data = canvas.toDataURL();
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: data,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      alert('sucsecc');
    })
    .fail(function(){
      alert('error');
    })
  })
});

