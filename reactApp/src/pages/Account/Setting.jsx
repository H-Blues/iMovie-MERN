import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid, Stack } from '@mui/material';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { updateUserInfo } from '../../api/customApi';
import AvatarUploader from '../../components/avatarUploader';
import { toast } from 'react-toastify';
import { setUserInfo } from '../../redux/features/userSlice';

const Setting = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const [id, setId] = useState(userInfo._id);
  const [username, setUserName] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);
  const [address, setAddress] = useState(userInfo.address);
  const [phone, setPhone] = useState(userInfo.phone);
  const [pic, setPic] = useState(userInfo.pic);

  const settingStyle = {
    display: 'block',
    width: '90%',
    height: 'auto',
    margin: '2% 5%',
    borderRadius: '20px',
    overflow: 'auto',
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
      console.log(reader.result);
      setPic(reader.result.toString());
      e.target.value = '';
    };
    reader.readAsDataURL(files[0]);
  };

  const saveUserInfo = async () => {
    const result = await updateUserInfo(id, username, email, address, phone, pic);
    if (result.success) {
      toast.success('Update user information successfully');
      dispatch(setUserInfo(result.user));
      console.log(result.user);
    } else {
      toast.error(result.msg);
    }
  };

  return (
    <>
      <div className="setting" style={settingStyle}>
        <Grid container spacing={5} sx={{ padding: '5%' }}>
          <Grid item xs={8} container sx={{ boxShadow: '0 0 50px rgba(0, 0, 0, 0.08)' }}>
            <Grid item xs={3} sx={{ marginTop: '-20px', paddingBottom: '3%' }}>
              <h3>Personal Information</h3>
              <AvatarUploader username={userInfo.username} pic={pic} onChange={onChoose} />
            </Grid>
            <Grid item xs={8}>
              <FormControl sx={{ margin: '10px 10px 10px 0', width: '300px' }}>
                <InputLabel>Username</InputLabel>
                <OutlinedInput
                  defaultValue={username}
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
              </FormControl>
              <FormControl sx={{ margin: '10px 10px 10px 0', width: '300px' }}>
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  defaultValue={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </FormControl>
              <FormControl sx={{ margin: '10px 10px 10px 0', width: '300px' }}>
                <InputLabel>Address</InputLabel>
                <OutlinedInput
                  defaultValue={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </FormControl>
              <FormControl sx={{ margin: '10px 10px 10px 0', width: '300px' }}>
                <InputLabel>Phone</InputLabel>
                <OutlinedInput
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
          <Grid item xs={4}>
            balabala
          </Grid>
          <Grid item xs={8}>
            balabala
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Setting;
