import { useState, useEffect, useRef } from 'react';
import { Menu, MenuItem, TextField, useMediaQuery, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  // convertToPixelCrop,
} from 'react-image-crop';

import { useDebounceEffect } from './useDebounceEffect';
import { canvasPreview } from './canvasPreview'

import 'react-image-crop/dist/ReactCrop.css'

import ChevronDown from '../../../components/icons/ChevronDown';
import MenuRenderer from './MenuRenderer';
import NavbarRoleSelector from './NavbarRoleSelector';
import { Notifications } from './Notifications';
import styles from './navbar.module.scss';

import { useSnackbar } from 'notistack';
import axios from 'axios';

import { useHistory } from 'react-router-dom';

import { useUser, ToolMenuContainer, useDorothy } from 'dorothy-dna-react';

import ConfirmationDialog from './../ConfirmationDialog';

import { layoutTabletMQ } from '../../../utils/configs';

function centerAspectCrop(
  mediaWidth,
  mediaHeight,
  aspect,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function Navbar({ appLogo }) {
  let history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { logout, user } = useUser();
  const { server } = useDorothy();

  const [passwordDialg, _passwordDialg] = useState(false);
  const [password, _password] = useState('');
  const [password_conf, _password_conf] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [showProfile, _showProfile] = useState(false);

  const [showProfileImage, _showProfileImage] = useState(false);
  const [imgSrc, _imgSrc] = useState('');
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  // const hiddenAnchorRef = useRef(null)
  // const blobUrlRef = useRef('')
  const [crop, _crop] = useState()
  const [completedCrop, _completedCrop] = useState()
  const [scale, _scale] = useState(1)
  const [rotate, _rotate] = useState(0)
  const [thumbstamp, _thumbstamp] = useState(Date.now());

  const isLayoutTablet = useMediaQuery(layoutTabletMQ);

  useEffect(() => {
    if (!passwordDialg) return;

    _password('');
    _password_conf('');
  }, [passwordDialg]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();

    history.push('/');
  };

  const openProfile = () => {
    setAnchorEl(null);
    _showProfile(true);
  }

  const openProfileImage = () => {
    setAnchorEl(null);
    _showProfileImage(true);
  }

  const handleChangePasswwordRequest = () => {
    setAnchorEl(null);
    _passwordDialg(true);
  };

  const handleChangePassword = async action => {
    if (action !== 'confirm') {
      _passwordDialg(false);
      return;
    }

    if (!password.length) {
      enqueueSnackbar('Você deve fornecer uma nova senha!', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });

      return;
    }

    if (password !== password_conf) {
      enqueueSnackbar('As senhas devem ser idênticas!', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });

      return;
    }

    const snack = enqueueSnackbar('Alterando a senha...', {
      persist: true,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    });

    try {
      const {
        data: { success },
      } = await axios.put(`${server}user/change_my_password`, {
        password,
      });

      closeSnackbar(snack);

      if (!success) throw new Error('Password change error!');

      enqueueSnackbar('Sua senha foi alterada com sucesso!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });

      _password('');
      _password_conf('');

      _passwordDialg(false);
    } catch (e) {
      closeSnackbar(snack);

      enqueueSnackbar('Erro ao requisitar a recuperação de senha', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
    }
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {

      _crop(undefined) // Makes crop preview update between images.

      const reader = new FileReader()
      reader.addEventListener('load', () =>
        _imgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget
    _crop(centerAspectCrop(width, height, 1))
  }

  const handleProfileImageSave = async () => {
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist')
    }

    const blob = await (new Promise((resolve) => previewCanvasRef.current.toBlob((blob) => resolve(blob))));

    if (!blob) {
      throw new Error('Failed to create blob')
    }

    _showProfileImage(false);
    _imgSrc('');

    const snack = enqueueSnackbar('Alterando o imagem do perfil...', {
      persist: true,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    });

    const thumbFile = new File([blob], 'image.jpeg', {
      type: blob.type,
    });

    let data = new FormData();
    data.append('thumb', thumbFile);

    await axios({
      method: 'post',
      url: `${server}user/thumb`,
      data,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    });

    _thumbstamp(Date.now());

    closeSnackbar(snack);
  }

  const handleCloseProfileImage = () => {
    _showProfileImage(false);
    _imgSrc('');
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  return (
    <>
      <div className={`${styles.navbar}`}>
        <div className={`${styles.nav_start}`}>
          <img className={`${styles.nav_logo}`} src={appLogo} alt="logo" />
          <NavbarRoleSelector onFilterChange={value => console.log('navbar role selector', value)} />
        </div>

        <div className={`${styles.nav_center}`}>
          <ToolMenuContainer>
            <MenuRenderer />
          </ToolMenuContainer>
        </div>
        <div className={`${styles.nav_end}`}>
          <Notifications />
          <div className={`${styles.nav_profile}`}>
            <div
              className={`${styles.nav_profile_btn}`}
              id="profile-btn"
              aria-controls="profile-menu"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {thumbstamp && <img className={`${styles.nav_profile_img}`} src={`${server}user/${user.id}/thumb/?ts=${thumbstamp}`} alt="avatar" />}
              {!isLayoutTablet ? user.name : ''}
              <ChevronDown />
            </div>
            <Menu
              className={`${styles.nav_profile_menu}`}
              id="profile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'profile-btn',
              }}
            >
              <MenuItem onClick={openProfile}>Meu perfil</MenuItem>
              <MenuItem onClick={openProfileImage}>Alterar a foto do perfil</MenuItem>
              <MenuItem onClick={handleChangePasswwordRequest}>Trocar senha</MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>

              <div className={`${styles.version_number}`}>
                <small>{process.env.REACT_APP_VERSION}</small>
              </div>
            </Menu>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        open={passwordDialg}
        title="Alteração de senha"
        content={
          <>
            <div className="row mb-3">
              <TextField
                className="input-text"
                type="password"
                id="text-pass"
                placeholder="senha"
                value={password}
                onChange={e => _password(e.target.value)}
              />
            </div>
            <div className="row mb-3">
              <TextField
                className="input-text"
                type="password"
                id="text-pass"
                placeholder="confirmação de senha"
                value={password_conf}
                onChange={e => _password_conf(e.target.value)}
              />
            </div>
          </>
        }
        confirmButtonText="Alterar sua senha"
        onClose={handleChangePassword}
      />

      <Dialog
        className="modal"
        open={showProfile}
        onClose={() => _showProfile(false)}
        maxWidth="md"
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Editar perfil</DialogTitle>
        <DialogContent dividers={true}>
          TODO: profile
        </DialogContent>
        <DialogActions>
          <Button onClick={console.log}>gravar</Button>
          <Button onClick={() => _showProfile(false)}>cancelar</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        className="modal"
        open={showProfileImage}
        onClose={handleCloseProfileImage}
        maxWidth="md"
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Editar perfil</DialogTitle>
        <DialogContent dividers={true}>
          <div className="row">
            <div className="col-xs-4">
              <input type="file" accept="image/*" onChange={onSelectFile} />
            </div>
            <div className="col-xs-4">
              <label htmlFor="scale-input">Scale: </label>
              <input
                id="scale-input"
                type="number"
                step="0.1"
                value={scale}
                disabled={!imgSrc}
                onChange={(e) => _scale(Number(e.target.value))}
              />
            </div>
            <div className="col-xs-4">
              <label htmlFor="rotate-input">Rotate: </label>
              <input
                id="rotate-input"
                type="number"
                value={rotate}
                disabled={!imgSrc}
                onChange={(e) =>
                  _rotate(Math.min(180, Math.max(-180, Number(e.target.value))))
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
              {!!imgSrc && (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => _crop(percentCrop)}
                  onComplete={(c) => _completedCrop(c)}
                  minHeight={100}
                  circularCrop={true}
                  aspect={1}
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                    onLoad={onImageLoad}
                    /* height="500" */
                  />
                </ReactCrop>
              )}
            </div>
            <div className="col-xs-6">
              {!!imgSrc && !!completedCrop && (
                <>
                  <div>
                    <canvas
                      ref={previewCanvasRef}
                      style={{
                        border: '1px solid black',
                        objectFit: 'contain',
                        width: completedCrop.width,
                        height: completedCrop.height,
                        borderRadius: '50%',
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProfileImageSave}>gravar</Button>
          <Button onClick={handleCloseProfileImage}>cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
