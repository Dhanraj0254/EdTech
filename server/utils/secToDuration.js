//helper function to convert all second to duration format
function convertSecondToDuration(totalSecond){
    const hours=Math.floor(totalSecond/3600);
    const minutes=Math.floor((totalSecond%3600)/60)
      const second=Math.floor((totalSecond%3600)%60);

      if(hour>0){
        return `${hour}h ${minutes}m`
      }
      else if(minutes>0){
        return `${minutes}m ${second}s`
      }else{
        return `${second}s`
      }
}
module.exports={convertSecondToDuration};