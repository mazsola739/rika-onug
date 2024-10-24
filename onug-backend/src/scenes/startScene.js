import { tick } from './tick';

export const startScene = (room_id) => setTimeout(() => tick(room_id), 2000)