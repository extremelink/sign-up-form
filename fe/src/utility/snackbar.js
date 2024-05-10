import { enqueueSnackbar } from "notistack"

const snackbar = (type,message)=>{
    if(type == 'success' || type =='error' || type=='warning' || type=='info'){
        enqueueSnackbar(message,{variant:type, anchorOrigin:{vertical:'top',horizontal:'right'}})
    }
    else enqueueSnackbar(message,{variant:'default', anchorOrigin:{vertical:'top',horizontal:'right'}})

}


export default snackbar;

