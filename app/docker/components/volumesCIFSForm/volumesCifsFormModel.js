export function VolumesCIFSFormData() {
  this.useCIFS = false;
  this.serverAddress = '';
  this.share = '';
  this.version = 'CIFS v2.0 (适用于 Windows Vista / Server 2008 系统)';
  this.versions = [
    'CIFS v1.0 (适用于 Windows XP / Server 2003 及更早版本系统)',
    'CIFS v2.0 (适用于 Windows Vista / Server 2008 系统)',
    'CIFS v2.1 (适用于 Windows 7 / Server 2008 R2 系统)',
    'CIFS 3.0 (适用于 Windows 8 / Server 2012 及更新版本系统)',
  ];
  this.versionsNumber = ['1.0', '2.0', '2.1', '3.0'];
  this.username = '';
  this.password = '';
}
