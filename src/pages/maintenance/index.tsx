import classNames from 'classnames/bind'
import styles from './NotFound.module.sass'
import useMediaQuery from 'hooks/media/useMediaQuery'
import imageBackgroundImgHome from 'resources/images/bgr.png'
import Bg1 from 'resources/svg/Bg1'
import Bg2 from 'resources/svg/Bg2'
const cx = classNames.bind(styles)

function NotFound() {
  const maxSmSize = useMediaQuery('(max-width: 768px)')

  return (
    <div className={cx('not-found-wrapper')} style={{ backgroundImage: `url(${imageBackgroundImgHome})` }}>
      {maxSmSize ? (
        <div>
          <Bg2 />
        </div>
      ) : (
        <div>
          <Bg1 />
        </div>
      )}
    </div>
  )
}

export default NotFound