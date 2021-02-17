import {
  React,
  FunctionComponent,
  useEffect,
  useApp,
  useInput,
  isEqual,
} from '@roots/bud-support'
import {useStyle} from '@roots/ink-use-style'

import {Reporter} from './Reporter'
import {useDisk} from '../hooks/useDisk'
import {usePackageJson} from '../hooks/usePackageJson'
import {useCompilation} from '../hooks/useCompilation'
import {Framework} from '@roots/bud-typings'

export const Dashboard: FunctionComponent<{
  bud: Framework<any>
}> = ({bud}) => {
  const app = useApp()
  const [disk] = useDisk(bud)
  const {stats, progress, errors} = useCompilation(bud)
  const pkg = usePackageJson(disk)
  const style = useStyle()

  useInput(input => {
    if (input == 'q') {
      app.exit()
      console.clear()
      process.exit()
    }
  })

  /**
   * @todo setTimeout here is bad
   */
  useEffect(() => {
    if (
      bud.isProduction &&
      (stats?.assets?.length > 0 || errors) &&
      isEqual(progress?.decimal, 1)
    ) {
      setTimeout(() => {
        app.exit()
        console.clear()
        process.exit()
      }, 100)
    }
  }, [bud])

  return (
    <Reporter
      errors={errors}
      bud={bud}
      stats={stats}
      progress={progress}
      pkg={pkg}
      {...style}
    />
  )
}
