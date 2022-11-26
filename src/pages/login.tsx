import Link from 'next/link'

import { Layout } from '@/components/Layout/Layout'
import { PageHead } from '@/components/PageHead/PageHead'
import { UserAuthForm } from '@/components/UserAuthForm/UserAuthForm'

export default function LoginPage() {
  return (
    <Layout>
      <PageHead />

      <div className='container flex flex-col items-center justify-center flex-1 w-full'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-bold'>Welcome back</h1>

            <p className='text-sm text-slate-600'>
              Enter your email to sign in to your account
            </p>
          </div>

          <UserAuthForm />

          <p className='px-8 text-center text-sm text-slate-600'>
            <Link href='/signup' className='underline hover:text-brand'>
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}
