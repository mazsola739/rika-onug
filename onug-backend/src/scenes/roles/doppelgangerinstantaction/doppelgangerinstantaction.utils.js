export const getRolesNames = (selectedCardIds, actionIds, roles) =>
  selectedCardIds.filter((id) => actionIds.includes(id)).map((id) => roles[id])

export const addVerboseOr = (rolesFromIds) => {
  if (rolesFromIds.length > 1) {
    rolesFromIds.splice(
      rolesFromIds.length - 1,
      0,
      'doppelganger_verbose_or_text'
    )
  }
  rolesFromIds
}
