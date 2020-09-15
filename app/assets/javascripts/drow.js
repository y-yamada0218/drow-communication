// - 線の色を変更する機能
// - 消しゴム機能
window.addEventListener('load', () => {
  const canvas = document.querySelector('#draw-area');
  const context = canvas.getContext('2d');

  const lastPosition = { x: null, y: null };
  let isDrag = false;
  let currentColor = '#000000';
 
  // 現在の線の太さを記憶する変数
  // <input id="range-selector" type="range"> の値と連動する
  let currentLineWidth = 1;
 
  function draw(x, y) {
    if(!isDrag) {
      return;
    }
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = currentLineWidth
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

  // 文字の太さの設定・更新を行う機能
  function initConfigOfLineWidth() {
    const textForCurrentSize = document.querySelector('#line-width');
    const rangeSelector = document.querySelector('#range-selector');
    // 線の太さを記憶している変数の値を更新する
    currentLineWidth = rangeSelector.value;
    rangeSelector.addEventListener('input', event => {
      const width = event.target.value;
      // 線の太さを記憶している変数の値を更新する
      currentLineWidth = width;
      // 更新した線の太さ値(数値)を<input id="range-selector" type="range">の右側に表示する
      textForCurrentSize.innerText = width;
    });
  }
 
  initEventHandler();
  // カラーパレット情報を初期化する
  initColorPalette();
  // 文字の太さの設定を行う機能を有効にする
  initConfigOfLineWidth();

  //過去にCanvasが保存されていた場合、それを呼び出す
  const chara = new Image();
  const room_illust = $('#room-illust').val();
  chara.src = room_illust;
  chara.onload = function onImageLoad() {
    context.drawImage(chara, 0, 0, 1165, 650)
  };

  //保存ボタン押すとDBにURLとして保存する
  $('#save-button').on('click',function(e){
    e.preventDefault();
    room_id = $('#room-info').val();
    data = canvas.toDataURL('image/png');
    let url = '/rooms/' + room_id
    $.ajax({
      url: url,
      type: "PATCH",
      data: {illust: data},
      dataType: 'json',
    })
    .done(function(){
      console.log('success');
    })
    .fail(function(){
      alert('error');
    })
  })
  
  //自動セーブ、自動更新を同時に行う
  $(function(){
      room_id = $('#room-info').val();
      url = '/rooms/' + room_id
      const room_illust = $('#room-illust').val();

      let reloadCanvas = function() {
        data = canvas.toDataURL('image/png');
      //自動セーブ部分
      $.ajax({
        url: url,
        type: "PATCH",
        data: {illust: data},
        dataType: 'json',
          //自動更新部分
          success: function(data){
            $.ajax({
              url: url,
              type: "GET",
              dataType: 'json',
            })
            .done(function(data) {
              const chara = new Image();
              chara.src = data.illust;
              chara.onload = function onImageLoad() {
                context.drawImage(chara, 0, 0, 1165, 650)
              };
            })
            .fail(function(){
            })
          }
      })

      .done(function(data){
      })
      .fail(function(){
      })
    }
      setInterval(reloadCanvas, 100);

    //参加者を自動更新する
    $(function(){
      room_id = $('#room-info').val();
      reloadurl = '/room/' + room_id
    
      let reloadUser = function() {
      $.ajax({
        url: reloadurl,
        type: "get",
        dataType: 'json',
      })
      .done(function(data){
        console.log(data);
        $('.main_drow__member__name').empty();
        data.forEach(function(member){
          $('.main_drow__member__name').append(`${member.name}さん, `);

        })
      })
      .fail(function(){
        console.log('no');
      })
    }
      setInterval(reloadUser, 3000);
    });
  })
});
