-- FUNCTION: public.get_weapon_properties(bigint, bigint)

-- DROP FUNCTION public.get_weapon_properties(bigint, bigint);

CREATE OR REPLACE FUNCTION public.get_weapon_properties(
	"itemId" bigint,
	"linkTypeId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_agg(
	json_build_object(
		'id', arri.id
		, 'name', arri."itemName"
		, 'requireRange', wpnprop."requireRange"
		, 'requireAmmunition', wpnprop."requireAmmunition"
		, 'requireVersatileDamage', wpnprop."requireVersatileDamage"
		, 'requireSpecialDescription', wpnprop."requireSpecialDescription"
	)
)
FROM adm_core_item i
INNER JOIN adm_link lnk ON lnk."referenceId" = i.id
INNER JOIN adm_core_item arri ON arri.id = lnk."targetId" AND lnk."typeId" = $2
INNER JOIN adm_def_picklist_item_weapon_property wpnprop ON wpnprop."itemId" = lnk."targetId"
WHERE i.id = $1

$BODY$;

ALTER FUNCTION public.get_weapon_properties(bigint, bigint)
    OWNER TO postgres;
