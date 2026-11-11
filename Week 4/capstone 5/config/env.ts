import { LIVE_FORM_URL } from './liveForm';

const rawMode = (process.env.FORM_MODE || 'local').toLowerCase();
const remoteUrl = (process.env.FORM_URL || '').trim() || LIVE_FORM_URL;
const localPort = Number(process.env.PORT || 4173);

export const isRemote = rawMode === 'remote' && remoteUrl.length > 0;

export const BASE_URL = isRemote ? remoteUrl : `http://127.0.0.1:${localPort}`;

export const LOCAL_APP_PORT = localPort;
