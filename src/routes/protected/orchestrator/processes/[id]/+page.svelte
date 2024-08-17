<script>
  export let data;
  console.log("the data prop :", data);
  
</script>
<slot/>
{#if data.props.error}
  <div class="error">
      <h1>Error {data.props.error.status}</h1>
      <p>{data.props.error.message}</p>
  </div>
{:else if data.props.process}
  <div class="process-details">
      <h1>{data.props.process.name}</h1>
      <p>{data.props.process.description}</p>
      <p>Status: {data.props.process.status}</p>
      <p>Last run: {data.props.process.last_run || 'Not available'}</p>
      <p>Created at: {new Date(data.props.process.created_at).toLocaleString()}</p>
  </div>
{:else}
  <p>Loading...</p>
{/if}

<style>
.error {
  color: red;
}
.process-details {
  padding: 2rem;
  background-color: #130547;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
