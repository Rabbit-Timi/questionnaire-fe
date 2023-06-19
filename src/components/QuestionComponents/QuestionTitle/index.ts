/*
 * @Description: 标题
 * @Author: timmtiy
 */

import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

export default {
  title: '输入框',
  type: 'questionTitle',
  Component,
  defaultProps: QuestionTitleDefaultProps,
}
