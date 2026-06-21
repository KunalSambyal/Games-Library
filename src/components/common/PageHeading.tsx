interface Props {
    heading: string;
}

function PageHeading({ heading }: Props) {
    return (
        <div className="sm:text-3xl text-2xl font-semibold text-main py-2 px-4">
            {heading}
        </div>
    );
}

export default PageHeading;
