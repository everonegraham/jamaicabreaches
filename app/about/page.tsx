
export default function About() {
    return(
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                    About
                </h1>
                <p className="w-8/12 text-justify text-lg text-muted-foreground">
                    Jamaica Breaches aims to inform and empower individuals and businesses 
                    about the latest cybersecurity breaches, data leaks, hacks and scams
                    taking place in Jamaica. We do this this by logging some information about
                    these events, along with sources. We believe that knowledge is power. By staying
                    informed, we can all make better decisions.
                </p>
            </div>
    </section>
    )
}