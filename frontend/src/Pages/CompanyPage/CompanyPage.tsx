import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CompanyProfile } from '../../company'
import { getCompanyPorfile } from '../../api'
import Sidebar from '../../Components/SideBar/Sidebar'
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard'
import Tile from '../../Components/Tile/Tile'
import Spinner from '../../Components/Spinner/Spinner'

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams()
  const [company, setCompany] = useState<CompanyProfile>()

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyPorfile(ticker!)
      setCompany(result?.data[0])
    }
    getProfileInit()
  }, [])
  return (
    <>
      {company ? (
        <div className='w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden'>
          <Sidebar />
          <CompanyDashboard ticker={ticker!}>
            <Tile title='Company Name' subTitle={company.companyName} />
            <Tile title='Price' subTitle={company.price.toString()} />
            <Tile title='Sector' subTitle={company.sector} />
            <Tile title='DCF' subTitle={company.dcf.toString()} />
            <p className='bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4'>
              {company.description}
            </p>
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default CompanyPage
