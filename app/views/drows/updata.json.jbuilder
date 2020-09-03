json.id          @room.id
json.room_name   @room.room.name
json.illust      @room.illust.url
json.created_at  @room.created_at.strftime("%Y年%m月%d日 %H時%M分")
