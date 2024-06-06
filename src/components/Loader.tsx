import { TailSpin } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className="">
      <TailSpin
        color="#64748b"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        height={50}
        width={50}
      />
    </div>
  )
}

export default Loader
