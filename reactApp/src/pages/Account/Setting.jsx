import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Grid, Stack } from '@mui/material';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';
import { login, updateUserInfo, updateUserPwd } from '../../api/customApi';
import AvatarUploader from '../../components/avatarUploader';
import { setUserInfo, setLauguage } from '../../redux/features/userSlice';

const Setting = () => {
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated, language } = useSelector((state) => state.user);

  const [id] = useState(userInfo._id);
  const [username, setUserName] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);
  const [address, setAddress] = useState(userInfo.address);
  const [phone, setPhone] = useState(userInfo.phone);
  const [pic, setPic] = useState(userInfo.pic);
  const [previousPwd, setPreviousPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');

  const settingStyle = {
    display: 'block',
    width: '90%',
    height: 'auto',
    margin: '2% 5%',
    borderRadius: '20px',
    overflow: 'auto',
  };

  const borderStyle = {
    border: '2px solid #C0C0C0',
    borderRadius: '5px',
    marginBottom: '20px',
    marginRight: '40px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.08)',
  };

  const onChoose = (e) => {
    e.persist();
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPic(reader.result.toString());
      e.target.value = '';
    };
    reader.readAsDataURL(files[0]);
  };

  const languages = [
    { label: 'English', code: 'en-US' },
    { label: '简体中文', code: 'zh-CN' },
    { label: 'Française', code: 'fr' },
  ];

  const saveUserInfo = async () => {
    const result = await updateUserInfo(id, username, email, address, phone, pic);
    if (result.success) {
      toast.success('Update information successfully');
      dispatch(setUserInfo(result.data.user));
    } else {
      toast.error(result.msg);
    }
  };

  const saveUserPwd = async () => {
    let validNewPwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(newPwd);
    let validPrePwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(previousPwd);
    if (!validNewPwd || !validPrePwd) {
      toast.error('Password is at least 5 characters with 1 letter and 1 number');
      return;
    }
    const validResult = await login(userInfo.username, previousPwd);
    if (validResult.success) {
      const updateResult = await updateUserPwd(id, newPwd);
      if (updateResult.success) {
        toast.success('Update password successfully');
      } else {
        toast.error(updateResult.msg);
      }
    } else {
      toast.error(validResult.msg);
    }
  };

  return (
    <>
      {isAuthenticated && (
        <div className="setting" style={settingStyle}>
          <Grid container spacing={10} sx={{ padding: '5%' }}>
            <Grid item xs={8} container sx={borderStyle}>
              <Grid item xs={3} sx={{ marginTop: '-20px', paddingBottom: '3%' }}>
                <h3>Personal Information</h3>
                <AvatarUploader username={userInfo.username} pic={pic} onChange={onChoose} />
              </Grid>
              <Grid item xs={8}>
                <FormControl sx={{ margin: '10px 10px 10px 0', width: '300px' }}>
                  <InputLabel>Username</InputLabel>
                  <OutlinedInput
                    label="Username"
                    defaultValue={username}
                    onChange={(event) => {
                      setUserName(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl sx={{ margin: '10px 10px 10px 0', width: '300px' }}>
                  <InputLabel>Email</InputLabel>
                  <OutlinedInput
                    label="Email"
                    defaultValue={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl sx={{ margin: '10px 10px 10px 0', width: '300px' }}>
                  <InputLabel>Address</InputLabel>
                  <OutlinedInput
                    label="Address"
                    defaultValue={address}
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl sx={{ margin: '10px 10px 10px 0', width: '300px' }}>
                  <InputLabel>Phone</InputLabel>
                  <OutlinedInput
                    label="Phone"
                    defaultValue={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                  />
                </FormControl>
              </Grid>
              <Stack spacing={5} direction="row" sx={{ margin: '0 3% 3% 35%' }}>
                <Button variant="contained" onClick={saveUserInfo}>
                  Save
                </Button>
                <Button variant="outlined">Cancel</Button>
              </Stack>
            </Grid>

            <Grid item xs={3} sx={borderStyle}>
              <h3>Preferences</h3>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={languages}
                sx={{ width: 250, margin: '20px 0' }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label="Preferred Language" />}
                onInputChange={(event, value) => {
                  var code;
                  if (!value) code = 'en-US';
                  else code = languages.filter((l) => l.label === value)[0].code;
                  dispatch(setLauguage(code));
                }}
              />
              <p>
                Your choice is: <i>{language}</i>
              </p>
            </Grid>

            <Grid item xs={8} sx={borderStyle}>
              <h3>Reset Password</h3>
              <FormControl sx={{ margin: '20px 30px 20px 20px', width: '400px' }}>
                <InputLabel>Previous Password</InputLabel>
                <OutlinedInput
                  label="Previous Password"
                  type="password"
                  defaultValue=""
                  onChange={(event) => {
                    setPreviousPwd(event.target.value);
                  }}
                />
              </FormControl>
              <FormControl sx={{ margin: '20px 30px 20px 20px', width: '400px' }}>
                <InputLabel>New Password</InputLabel>
                <OutlinedInput
                  label="New Password"
                  type="password"
                  onChange={(event) => {
                    setNewPwd(event.target.value);
                  }}
                />
              </FormControl>
              <Stack spacing={5} direction="row" sx={{ margin: '0 3% 3% 35%' }}>
                <Button variant="contained" onClick={saveUserPwd}>
                  Save
                </Button>
                <Button variant="outlined">Cancel</Button>
              </Stack>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Setting;
