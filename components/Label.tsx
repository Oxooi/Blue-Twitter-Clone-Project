interface LabelProps {
    label: string;
}

const Label: React.FC<LabelProps> = ({
    label

}) => {
    return (
        <div>
            <p className="underline text-white">
                {label} :
            </p>
        </div>
    );
}

export default Label;