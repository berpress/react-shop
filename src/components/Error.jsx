function Error(props) {
    const { name = ''} = props;

    return (
        <div class="card-panel red lighten-2">{name}</div>
    );
}

export { Error };