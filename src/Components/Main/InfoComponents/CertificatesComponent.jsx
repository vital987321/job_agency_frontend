import certificate1 from '../../../img/certificate1.png'
import certificate2 from '../../../img/certificate2.png'
import certificate3 from '../../../img/certificate3.png'
import "../../../css/infoComponents/certificates.css"

export const CertificatesComponent = ()=>{
    return <>
    <section className='certificates-section'>
        <h1 className='certificate-section-header'>Certificates</h1>
        <ul className='certificates-list'>
            <li className='certificate-container'>
               <img className='certificate-img' src={certificate1} alt="certificate" /> 
               <p>Business lisence</p>
            </li>
            <li className='certificate-container'>
               <img className='certificate-img' src={certificate2} alt="certificate" /> 
               <p>Business registration</p>
            </li>
            <li className='certificate-container'>
               <img className='certificate-img' src={certificate3} alt="certificate" /> 
               <p>Working contract</p>
            </li>
        </ul>

    </section>
    </>
}