
export default {
  resourceError: function(_status){
    let status;
    typeof _status === 'undefined' ? status = 'is unavailable' : status = 'returned ' + _status;
    return {
      title: 'Resource is Unavailable!',
      text: 'The API endpoint you requested ' + status + '. Please contact an administrator!',
      icon: 'warning',
    }
  },
  endpointError: function(_error){
    return {
      title: _error.title,
      text: _error.message,
      icon: 'warning',
    }
  },
  genericError: function(_title,_text){
    let title,text;
    typeof _title === 'undefined' ? title = 'Error' : title = _title;
    typeof _text === 'undefined' ? text = '' : text = _text;
    return {
      title: title,
      text: text,
      icon: 'warning'
    }
  },
  genericSuccess: function(_title,_text){
    let title,text;
    typeof _title === 'undefined' ? title = 'Success' : title = _title;
    typeof _text === 'undefined' ? text = '' : text = _text;
    return {
      title: title,
      text: text,
      icon: 'success'
    }
  },
  comingSoon: function(){
    return {
      title: 'Coming Soon!',
      text: 'This feature is currently under development.',
      icon: 'success',
    }
  },
  confirmDelete: function(){
    return {
      title: 'Confirm Delete!',
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }
  },
  confirmFormReset: function(){
    return {
      title: 'Confirm Form Reset!',
      text: 'Are you sure you want to reset the form?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }
  },
  deleteSuccess: function(){
    return {
      title: 'Delete Successful!',
      text: '',
      icon: 'success',
      timer: 750
    }
  },
  saveSuccess: function(){
    return {
      title: 'Save Successful!',
      text: '',
      icon: 'success',
      timer: 750
    }
  },
  unableToLogin: function(_text){
    let text;
    typeof _text === 'undefined' ? text = '' : text = _text;
    return {
      title: 'Unable to Login!',
      text: text,
      icon: 'warning'
    }
  },
  confirmLogout: function(){
    return {
      title: 'Confirm Logout',
      text: 'Are you sure you want to end your session?',
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }
  },
  confirmGoBack: function(){
    return {
      title: 'Please Confirm',
      text: 'Are you sure you want to navigate back?',
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }
  },
  confirmCancel: function(){
    return {
      title: 'Please Confirm',
      text: 'Any unsaved changes will be lost.',
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
    }
  }
}
