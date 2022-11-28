import Link from 'next/link'

import { Layout } from '@/components/Layout/Layout'
import { PageHead } from '@/components/PageHead/PageHead'
import { UserAuthForm } from '@/components/UserAuthForm/UserAuthForm'

export default function SignupPage() {
  return (
    <Layout>
      <PageHead />

      {/* <Link
          href='/login'
          className='absolute top-4 right-4 inline-flex items-center justify-center rounded-lg border border-transparent bg-transparent py-2 px-3 text-center text-sm  font-medium text-slate-900 hover:border-slate-200 hover:bg-slate-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 md:top-8 md:right-8'
        >
          Login
        </Link> */}

      <div className='container flex flex-col items-center justify-center flex-1 w-full'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-bold'>Sign Up</h1>
            <p className='text-sm text-fg-1'>
              Enter your email below to create an account
            </p>
          </div>

          <UserAuthForm emailCTA='Sign up with email' />

          <p className='px-8 text-center text-sm text-fg-1'>
            Already have an account?{' '}
            <Link href='/login' className='link'>
              Log in
            </Link>
          </p>

          {/* TODO <p className='px-8 text-center text-sm text-fg-2'>
            By creating an account, you agree to our{' '}
            <Link href='/terms' className='link'>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href='/privacy' className='link'>
              Privacy Policy
            </Link>
            .
          </p> */}
        </div>
      </div>
    </Layout>
  )
}
