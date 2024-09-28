export default function CustomNotifications(){
    const toast = function(c){
      const {
        msg = "",
        icon = "success",
        position = "top-end",

      } = c;
      const Toast = Swal.mixin({
        toast: true,
        title: msg,
        position: position,
        icon: icon,
        showConfirmButton: false,
        timer: 3000,
        timerProgresBar: true,
        didOpen: () => {
          toast.addEventListener('mouseenter', Swal.stopTimer),
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({});
    };
    const modalSuccess = function(c){
      const {
        msg = "",
        title = "",
        footer = "",
      } = c;
      Swal.fire({
        icon: "success",
        title: title,
        text: msg, 
        footer: footer,
      });
    };
    const modalError = function(c){
      const {
        msg = "",
        title = "",
        footer = "",
      } = c;
      Swal.fire({
        icon: "error",
        title: title,
        text: msg, 
        footer: footer,
      });
    }

    const notify = function notify(msg, msgType){
      notie.alert({
        type: msgType,
        text: msg, 
      });
    };

    const modalForm = async function(c){
      const {
        formHtml = "",
        title = "",
      } = c;

      const { value: formValues } = await Swal.fire({
        title: title,
        html: formHtml,
        focusConfirm: false,
        showCancelButton: true,
        didOpen: () => {
          const elt = document.getElementById("reservation-dates-modal");
          const datePicker = new DateRangePicker(elt, {
            format: 'yyyy-mm-dd',
            orientation: 'top',
            showOnFocus: true,
          });
        },
        preConfirm: () => {
          return [
            document.getElementById('start').value,
            document.getElementById('end').value,
          ]
        } 
      })
      if(formValues){
        Swal.fire(JSON.stringify(formValues));
      }
    }

    return {
      toast: toast,
      modalSuccess: modalSuccess,
      modalError: modalError,
      modalForm: modalForm,
      notify: notify
    }
}