-- FUNCTION: public.get_natural_weapons(bigint)

-- DROP FUNCTION public.get_natural_weapons(bigint);

CREATE OR REPLACE FUNCTION public.get_natural_weapons(
	"itemId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_agg(
	json_build_object(
		'type', get_item(natwpn."typeId"),
		'attack', json_build_object(
			'abilityScore', get_item(natwpn."attackAbilityScoreId"),
			'count', natwpn."attackCount"
		),
		'damage', json_build_object(
			'abilityScore', get_item(natwpn."damageAbilityScoreId"),
			'type', get_item(natwpn."damageTypeId"),
			'dice', get_dice(natwpn."damageDiceId")
		)
	)
)
FROM adm_link lnk
INNER JOIN adm_def_natural_weapon natwpn ON natwpn."naturalWeaponId" = lnk."targetId"
WHERE lnk."referenceId" = $1
AND lnk."typeId" = 5251

$BODY$;

ALTER FUNCTION public.get_natural_weapons(bigint)
    OWNER TO postgres;
