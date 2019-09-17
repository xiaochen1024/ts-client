/* global sneaky */

const FILTER = ['- node_modules'].join('\n')

const INSTALL = ['yarn install --production'].join(' && ')

function TaskSalesdemoConfig() {
  this.user = 'root'
  this.host = ''
  this.port = 22

  this.filter = FILTER

  this.after(INSTALL)

  this.overwrite = true
  this.nochdir = true
}

sneaky('demo', function() {
  TaskSalesdemoConfig.call(this)

  this.description = 'Deploying to demo environment...'
  this.path = '/teambition'

  this.after(
    [
      'cd /teambition/source',
      'pm2 start pm2.json'
    ].join(' && ')
  )
})
