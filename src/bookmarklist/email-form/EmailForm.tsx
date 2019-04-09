import React, { useState } from 'react';
import { TextField } from '../../components/form-components/TextField';
import './EmailForm.scss';
import { Button } from '../../components/form-components/Button';
type EmailFormProps = {
  email: string,
  onEmailChange: any,
  onSubmit: any
}
export const EmailForm = ({email, onEmailChange, onSubmit }: EmailFormProps) => {
  return (
    <div className="EmailForm">
      <h3 className="email-form-title" >Sync Bookmarks</h3>
      <p className="email-form-desc">Upload/Download your bookmarks using your email</p>
      <TextField value={email} onChange={(email) => onEmailChange(email)} label="Email" id="email" onKeyEnter={onSubmit} />
      <Button value='Send' isPrimary={true} onClick={onSubmit} />
    </div>
  )
}