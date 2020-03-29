export function getNextStatus(status){
  if(status === 'Chờ duyệt' || status === 'Chờ duyệt lại'){
    return 'Duyệt 1'
  }
  if(status === 'Duyệt 1'){
    return 'Duyệt 2'
  }

}