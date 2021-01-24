import UserLayout from "../../components/UserLayout";
import Head from "next/head";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {}
}

const Dashboard = ({ dispatch }) => {
    return (
        <UserLayout>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={"flex p-4 w-full"}>
                Main
            </div>
        </UserLayout>
    )
}

export default connect(mapStateToProps)(Dashboard);