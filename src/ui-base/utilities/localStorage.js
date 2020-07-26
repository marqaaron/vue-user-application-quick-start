export default {
  write(key, val) {
    if (localStorage) {
      try {
        let data = JSON.stringify(val)
        localStorage.setItem(key, data);
      } catch(e) {
        if (!window.noLocalStorageWarned) {
          alert('Local Storage Error: You may be using Safari in Private Mode. For best results, we recommend using Safari in Standard mode.');
          window.noLocalStorageWarned = true;
        }
      }
    }
  },
  get(key){
    let data = localStorage.getItem(key);
    if (data) {
      let parsedData = JSON.parse(data);
      return parsedData;
    }
  },
  delete(key){
    if (localStorage) {
      try {
        localStorage.removeItem(key);
      } catch(e) {
      }
    }
  },
  clear() {
    if (localStorage) {
      try {
        localStorage.clear();
      } catch(e) {
      }
    }
  }
}
