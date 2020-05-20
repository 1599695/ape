function MiniMap( mapW, map ) {
    var context = document.getElementById('miniMap').getContext('2d');
    
    for(var i = 0; i < mapW; ++i) {
        for(var j = 0; j < map[i].length; ++j){
            if(map[i][j == 0]){
                context.fillStyle = '0x0000FF';
                context.fillRect(i * 20, j * 20, (i+1)*20, (j+1)*20);
            }
            else if(map[i][j == 5]){
                context.fillStyle = '0x666666';
                context.fillRect(i * 20, j * 20, (i+1)*20, (j+1)*20);
            }
        }
    }
}
export { MiniMap };