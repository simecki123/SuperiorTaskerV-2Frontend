/* eslint-disable @typescript-eslint/no-explicit-any */

import { fetchImproved } from '@/app/server-actions/fetchImproved';
import { auth } from '@/commons/auth';
import React from 'react'

export default async function ProfileIcon() {

    const session = await auth();
    const activeUser: any = session?.user;
    
    const user: any = await fetchImproved(`/api/profiles/${activeUser?.userProfileId}`);
    user.email = activeUser?.email;

    

  return (
    <div>ProfileIcon</div>
  )
}