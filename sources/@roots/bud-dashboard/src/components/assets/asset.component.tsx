import {humanReadable} from '@roots/bud-support'
import {Box, Text} from 'ink'
import React from 'react'

const fileSize = humanReadable.sizeFormatter({
  decimalPlaces: 2,
  keepTrailingZeroes: false,
})

export const Asset = ({compilation, asset, theme}) => {
  return (
    <Box flexDirection="row" justifyContent="flex-start">
      <Box display={'flex'} width={theme.col(8)}>
        <Text wrap="truncate-end">
          {compilation.name}{' '}
          <Text
            color={
              asset.emitted ? theme.colors.success : theme.colors.faded
            }
          >
            {asset.emitted ? '✔ ' : '… '}
          </Text>
          {asset.name}
          {asset.cached && <Text color={theme.colors.faded}> cached</Text>}
        </Text>
      </Box>

      <Box display={'flex'} width={theme.col(1)}>
        {asset?.info?.minimized ? (
          <Text wrap="truncate-end" color={theme.colors.success}>
            ✔ min
          </Text>
        ) : (
          <Text wrap="truncate-end" color={theme.colors.faded}>
            ✘ min
          </Text>
        )}
      </Box>

      <Box display={'flex'} width={theme.col(2)}>
        <Text wrap="truncate-end" color={theme.colors.faded}>
          {fileSize(asset.size)}
        </Text>
      </Box>
    </Box>
  )
}
