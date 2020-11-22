export const snapshotToArray = (snapshot) => {
    const returnArr = [];
  
    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.id = childSnapshot.key;
  
      returnArr.push(item);
    });
  
    return returnArr;
  };
  