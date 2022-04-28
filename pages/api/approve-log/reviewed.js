

export default function handler(req, res) {
    if (req.method == "PUT") {
        return res.status(200).json({
            data: "hello"
            }
        )
    }
}


async function updateApprove() {

}