import pino from 'pino';
import baseUtil from '@src/util/baseUtil';

export default pino({
  enabled: baseUtil.LOGGER_AVAILABILITY,
  level: baseUtil.LOGGER_LEVEL
});