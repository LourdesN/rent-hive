import { useParams } from "react-router-dom"

const Invoice = () =>
{
    const { ref } = useParams()

    return(
        <>
            <h1>Invoice page for invoice no {ref}</h1>
        </>
    )

}
export default Invoice