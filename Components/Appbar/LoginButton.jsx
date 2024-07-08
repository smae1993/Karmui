import { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, CircularProgress, Collapse, InputAdornment, LinearProgress, Tab, Tabs, TextField, Typography } from '@mui/material';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import Fade from '@mui/material/Fade';
import { useInterval } from 'usehooks-ts'
import AppbarButton from './AppbarButton';
import { RiLoginBoxFill, RiLoginBoxLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import VerificationInput from 'react-verification-input';
import KarmaniaDialog from '../KarmaniaDialog';



function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

export default function LoginButton() {
    // var counterMax = 20;
    const { t } = useTranslation();
    var mobile;
    var email;
    var code = "0";


//   const [code, setCode] = useState("0");
  const [mobileOrEmail, setMobileOrEmail] = useState("0");
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(20);
  const [counterMax, setCounterMax] = useState(20);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [incorrectMobile, setIncorrectMobile] = useState(false);
  const [incorrectCode, setIncorrectCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeMode, setCodeMode] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorString, setErrorString] = useState("");



  useInterval(
    () => {
      // Your custom logic here
      if(codeMode){
        setCount(count - 1);
      if((count-1) < 1){
        setCodeMode(false);
        setLoading(false);
      }
      }
    },
    // Delay in milliseconds or null to stop it
    (count > 0) ? 1000 : null,
  )

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeMobile = () => {
    setCodeMode(false);
    setLoading(false);
  }

  const submit = async () => {
    setHasError(false);
    setLoading(true);
    await timeout(1000);
    var mobile = null;
    var email = null;
    if(mobileOrEmail == "0"){
        mobile = document.getElementById('mobile').value;
    }
    else if(mobileOrEmail == "1") {
        email = document.getElementById('email').value;
    }
    if(codeMode){
        // mobileOrEmail = document.getElementById('mobileOrEmail').value;
        // code = document.getElementById('code').value;
        if(isSmsCode(code)){
            setIncorrectCode(false);
            setLoading(true);
            axios.post(route("authenticate"), null, { params: {mobile, email, code}})
                .then(response => {
                    setLoading(false);
                    // setLoading(false);
                    if(response.data.status === "success"){
                        window.location.reload(false);
                    }
                    else{
                        setHasError(true);
                        setErrorString(response.data.message);
                    }
                    // return response;
                }).catch(
                    error => {
                        setLoading(false);
                    }
                )
        }
        else{
            setIncorrectCode(true);
        }
    }
    else{


        if((mobileOrEmail == "0" && isPhoneNumber(mobile))|| (mobileOrEmail == "1" && isMail(email))){
            setIncorrectMobile(false);
            setIncorrectEmail(false);
            setLoading(true);
            axios.post(route("checkAuth"), null, { params: {mobile, email}})
                .then(response => {
                    setLoading(false);
                    if(response.data.status === "success"){
                        setCodeMode(true);
                        setCounterMax(response.data.content)
                        setCount(response.data.content)
                    }
                    else{
                        setLoading(false);
                        setHasError(true);
                        setErrorString(response.data.message);
                    }
                }).catch(
                    error => {
                        setLoading(false);
                    }
                )
        }
        else{
            setCodeMode(false);
            setIncorrectMobile(true);
            setIncorrectEmail(true);
        }
    }
  };

  const handleTabChange = (event, newValue) => {
    setMobileOrEmail(newValue);
  };

  return (
    <div>
        <AppbarButton
            fixed={true}
            defaultText={t("loginTitle")}
            notHovered={<RiLoginBoxLine />}
            hovered={<RiLoginBoxFill />}
            onClick={handleClickOpen}
            />

        <KarmaniaDialog
            // sx={{ backgroundColor: "dialogB",}}
        //  PaperProps={{
        //     style: { borderRadius: 16, width: "400px", backdropFilter:"blur(10px)", } }}
            open={open}
            // color="dialogB"
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
             <DialogTitle id="alert-dialog-title" textAlign="center">
                {t("loginTitle")}
            </DialogTitle>
            <DialogContent sx={{pt: '10px !important', width: "400px"}}>
            <TabContext  value={mobileOrEmail} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: 'center' }}>
                <TabList value={mobileOrEmail} onChange={handleTabChange} centered >
                    <Tab label={t("mobile")}   value="0" disabled={loading || codeMode}/>
                    <Tab label={t("email")}  value="1" disabled={loading || codeMode}/>
                </TabList>
            </Box>
            <TabPanel value="0">

            <TextField
                disabled={loading || codeMode}
                error = {incorrectMobile}
                helperText= {incorrectMobile ? t("mobileInvalid") : ""}
                sx={{ width: '100%', direction: 'ltr'}}
                label={t("mobile")}
                id="mobile"

                defaultValue={mobile}
                variant="outlined"
                size="medium"
                InputProps={{ style: { borderRadius: '10px', textAlign: 'center' ,justifyContent: 'center' }}}
                    />
            </TabPanel >
            <TabPanel value="1">
            <TextField
                disabled={loading || codeMode}
                error = {incorrectEmail}
                helperText= {incorrectEmail ? t("emailInvalid") : ""}
                sx={{ width: '100%', direction: 'ltr'}}
                label={t("email")}
                id="email"

                defaultValue={email}
                variant="outlined"
                size="medium"
                InputProps={{ style: { borderRadius: '10px', textAlign: 'center' ,justifyContent: 'center' }}}
                    />
            </TabPanel>
            </TabContext>

                <Collapse in={codeMode}>
                    <div className='mt-8'>
                        <Typography align='center' sx={{mb: "15px"}}>کد تایید ارسال شده را وارد کنید
                        </Typography>
                    <VerificationInput onComplete={(val) => { code = val; submit();} } onChange={(val) => code = val}  placeholder='_'  length={5} validChars='0-9' classNames={{
                    container: "container border-gray-300 ",
                    character: "character rounded-lg border-gray-300 vazirmatn",
                    characterInactive: "character--inactive rounded-lg border-gray-300 vazirmatn",
                    characterSelected: "character--selected rounded-lg border-gray-300 vazirmatn",
                    characterFilled: "character--filled rounded-lg border-gray-300 vazirmatn",
                }}/>
                    <LinearProgress variant="determinate" sx={{mt: "15px"}} value={(count / counterMax) * 100} />
                        {/* <TextField
                            disabled={loading}
                            error = {incorrectCode}
                            helperText={incorrectCode ? t("verificationCodeInvalid") : ""}
                            sx={{ width: '100%', direction: 'ltr'}}
                            label={t("verificationCode")}
                            id="code"
                            variant="outlined"
                            size="medium"
                            InputProps={{ style: { borderRadius: '10px', textAlign: 'center' ,justifyContent: 'center'}, endAdornment: <InputAdornment position="end">
                                <CircularProgress size={20} variant="determinate" value={(count / counterMax) * 100} />
                            </InputAdornment>,}}
                        /> */}
                    </div>
                </Collapse>
            <Collapse in={hasError}>
            <p className='mt-4 text-red-500	'>{errorString}</p>

            </Collapse>

            </DialogContent>
            <DialogActions sx={{direction: "ltr"}}>
                <div className='flex-grow'>
                <Fade in={codeMode} timeout={1000}>
                    <Button color='textColor' onClick={handleChangeMobile}>{t("edit")}</Button>
                </Fade>

                </div>
            <Button color='textColor'  onClick={handleClose}>{t("cancel")}</Button>
            <LoadingButton
                disabled={codeMode && isSmsCode(code)}
                onClick={submit}
                loading={loading}
                loadingIndicator={<CircularProgress color="primary" size={20} />}
                color='textColor'>{t("continue")}</LoadingButton>
            </DialogActions>

      </KarmaniaDialog>
    </div>
  );
}


function isPhoneNumber(p) {
    return p.match(/^\d{11}$/g) !== null;
}
function isMail(p) {
    return p.match(/^\S+@\S+\.\S+$/) !== null;
}
function isSmsCode(p) {
    return p.match(/^\d{5}$/g) !== null;
}
